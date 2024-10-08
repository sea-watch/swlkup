(defproject swlkup-backend "1.3.0"
  :description "supervisor lookup backend"
  :min-lein-version "2.0.0"
  :dependencies [;; core
                 [org.clojure/clojure "1.11.1"]
                 [yogthos/config "1.2.0"]
                 [mount "0.1.17"]
                 [spootnik/signal "0.2.4"]
                 ;; db
                 [com.xtdb/xtdb-core "1.23.1"]
                 [com.xtdb/xtdb-rocksdb "1.23.1"]
                 ;; graphql + http
                 [org.clojars.johannesloetzsch/specialist-server "0.7.0" :exclusions [com.ibm.icu/icu4j]]
                 [compojure "1.7.0"]
                 [ring/ring-core "1.12.2"]
                 [ring/ring-jetty-adapter "1.10.0"]
                 [ring/ring-devel "1.10.0"]
                 [ring-cors "0.1.13"]
                 [ring/ring-json "0.5.1" :exclusions [cheshire]]
                   [cheshire "5.11.0"]
                 [ring-json-response "0.2.0"]
                 [co.deps/ring-etag-middleware "0.2.1"]
                 ;; auth + mail
                 [cryptohash-clj "0.1.11"]
                 [likid_geimfari/secrets "2.1.1"]
                 [crypto-random "1.2.1"]
                 [buddy/buddy-sign "3.4.333"]
                 [com.draines/postal "2.0.4"]
                 ;; graphiql  ;; TODO not required for productive build
                 [ring-webjars "0.2.0" :exclusions [org.webjars/webjars-locator]]
                   [org.webjars/webjars-locator "0.46"]
                 [org.webjars/graphiql "0.11.11"]
                 [org.webjars.npm/react "18.2.0" :exclusions [org.webjars.npm/loose-envify org.webjars.npm/js-tokens org.webjars.npm/object-assign]]
                 [org.webjars.npm/react-dom "18.2.0" :exclusions [org.webjars.npm/loose-envify org.webjars.npm/js-tokens org.webjars.npm/object-assign org.webjars.npm/scheduler]]
                 ;; logging
                 [org.clojure/tools.logging "1.2.4"]
                 [org.slf4j/slf4j-api "2.0.7"]
                 [org.slf4j/slf4j-simple "2.0.7"]
                ]
  :main swlkup.webserver.state
  :profiles {:dev {:dependencies [;; helpers for testing
                                  [javax.servlet/servlet-api "2.5"]
                                  [ring/ring-mock "0.4.0"]
                                  ;; additional deps to run `lein test` 
                                  [nrepl/nrepl "1.0.0"]
                                  [org.nrepl/incomplete "0.1.0"]
                                  [clojure-complete/clojure-complete "0.2.5"]]
                   #_#_:jvm-opts ["-Dverbose=true"]}
             :test {:jvm-opts ["-Ddb-inmemory=true" "-Ddb-seed=./src/swlkup/db/seed/example.edn" "-Ddb-export-prefix="]}
             :uberjar {:aot :all}}
  :jvm-opts ["-Dclojure.tools.logging.factory=clojure.tools.logging.impl/slf4j-factory"  ;; used by yogthos/config and com.xtdb/xtdb-core
             "-Dorg.slf4j.simpleLogger.defaultLogLevel=warn"  ;; usded by jetty (via ring/ring-jetty-adapter)
             "-Dlog4j2.formatMsgNoLookups=true"])  ;; not required, since log4j is no runtime dependency, but for defense-in-depth
