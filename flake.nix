{
  description = "Reproducible toolchain for building and testing Supervisor Lookup";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    mvn2nix-pkgs.url = "github:fzakaria/mvn2nix";
  };

  outputs =
    {
      self,
      nixpkgs,
      mvn2nix-pkgs,
    }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        overlays = [ (import ./frontend/nix/deps/cypress/cypress-overlay.nix) ];
      };
      mvn2nix = mvn2nix-pkgs.legacyPackages.${system}.mvn2nix;
      buildMavenRepositoryFromLockFile =
        mvn2nix-pkgs.legacyPackages.${system}.buildMavenRepositoryFromLockFile;
    in
    {
      packages.${system} = {
        inherit nixpkgs pkgs mvn2nix;

        default = self.packages.${system}.fullstack;

        ## Tools
        backendUpdatedDeps = import ./backend/nix/tools/updated-deps.nix { inherit pkgs mvn2nix; };
        frontendCodegen = import ./frontend/nix/tools/codegen.nix { inherit pkgs; };
        frontendUpdatedDeps = import ./frontend/nix/tools/updated-deps.nix { inherit pkgs; };
        cypress = import ./frontend/nix/deps/cypress/override.nix { inherit pkgs; };
        release = import ./.circleci/nix/tools/release.nix { inherit pkgs; };

        ## Builds
        backend = import ./backend/nix/swlkup-backend.nix {
          inherit pkgs buildMavenRepositoryFromLockFile;
        };
        frontend = import ./frontend/nix/swlkup-frontend.nix { inherit pkgs; };
        fullstack = import ./backend/nix/swlkup-backend.nix {
          inherit pkgs buildMavenRepositoryFromLockFile;
          patchPublic = self.packages.${system}.frontend.staticHTML;
        };
      };

      devShells.${system} = {
        default = import ./shell.nix { inherit pkgs; };
      };
    };
}
