import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from './fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The 'Long' scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^64) and 2^64 - 1. */
  Long: any;
  /** Either a collection of ngo-ids or `any` */
  NgoRefs: any;
};

/** Authentication requires either a valid mail+password combination or a jwt obtained by an earlier login. */
export type Auth = {
  /** Self descriptive. */
  jwt: Scalars['String'];
  /** Self descriptive. */
  mail: Scalars['String'];
  /** Self descriptive. */
  password: Scalars['String'];
};

export type Contacts = {
  __typename?: 'Contacts';
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type ContactsInput = {
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  address_string?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  address_string?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** If this server supports mutation, the type that mutation operations will be rooted at. */
export type MutationType = {
  __typename?: 'MutationType';
  create_token: Scalars['String'];
  /** Add a new supervisor account to the database and send a mail containing the password via mail */
  supervisor_register: Scalars['Boolean'];
  /** Update a supervisors data */
  supervisor_update: Scalars['Boolean'];
};


/** If this server supports mutation, the type that mutation operations will be rooted at. */
export type MutationTypeCreate_TokenArgs = {
  auth: Auth;
  purpose?: InputMaybe<Scalars['String']>;
};


/** If this server supports mutation, the type that mutation operations will be rooted at. */
export type MutationTypeSupervisor_RegisterArgs = {
  auth: Auth;
  mail: Scalars['String'];
};


/** If this server supports mutation, the type that mutation operations will be rooted at. */
export type MutationTypeSupervisor_UpdateArgs = {
  auth: Auth;
  supervisor_input: SupervisorInput;
};

/** The type that query operations will be rooted at. */
export type QueryType = {
  __typename?: 'QueryType';
  created_tokens: Array<Created_Tokens>;
  /** All languages */
  languages: Array<Languages>;
  /** For a username+password get a jwt containing the login:id */
  login: Login;
  /** All supervisors visible to the ngo assiged to the token */
  lookup: Lookup;
  /** All Ngos */
  ngos: Array<Ngos>;
  /** All offers */
  offers: Array<Offers>;
  /** For a supervisor login, get the supervisors data */
  supervisor_get?: Maybe<Supervisor_Get>;
  supervisors_registered: Array<Supervisors_Registered>;
};


/** The type that query operations will be rooted at. */
export type QueryTypeCreated_TokensArgs = {
  auth: Auth;
};


/** The type that query operations will be rooted at. */
export type QueryTypeLoginArgs = {
  auth: Auth;
};


/** The type that query operations will be rooted at. */
export type QueryTypeLookupArgs = {
  token: Scalars['String'];
};


/** The type that query operations will be rooted at. */
export type QueryTypeNgosArgs = {
  auth: Auth;
};


/** The type that query operations will be rooted at. */
export type QueryTypeSupervisor_GetArgs = {
  auth: Auth;
};


/** The type that query operations will be rooted at. */
export type QueryTypeSupervisors_RegisteredArgs = {
  auth: Auth;
};

/** The new Dataset of a Supervisor */
export type SupervisorInput = {
  /** Self descriptive. */
  contacts: ContactsInput;
  languages: Array<Scalars['String']>;
  /** Self descriptive. */
  location: LocationInput;
  /** Self descriptive. */
  name_full: Scalars['String'];
  /** Self descriptive. */
  ngos: Scalars['NgoRefs'];
  offers: Array<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  text_specialization?: InputMaybe<Scalars['String']>;
};

export type Created_Tokens = {
  __typename?: 'created_tokens';
  purpose?: Maybe<Scalars['String']>;
  /** The secret given to a group of users, allowing anonym access to the lookup */
  token: Scalars['String'];
};

/** All languages */
export type Languages = {
  __typename?: 'languages';
  /** Self descriptive. */
  flag_url: Scalars['String'];
  /** Self descriptive. */
  id: Scalars['String'];
  /** Self descriptive. */
  idx: Scalars['Int'];
  /** Self descriptive. */
  name: Scalars['String'];
};

/** For a username+password get a jwt containing the login:id */
export type Login = {
  __typename?: 'login';
  jwt?: Maybe<Scalars['String']>;
};

/** All supervisors visible to the ngo assiged to the token */
export type Lookup = {
  __typename?: 'lookup';
  /** Self descriptive. */
  ngo?: Maybe<Ngo>;
  /** Self descriptive. */
  supervisors?: Maybe<Array<Supervisors>>;
  /** Self descriptive. */
  valid: Scalars['Boolean'];
};

/** Details of a ngo */
export type Ngo = {
  __typename?: 'ngo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** All Ngos */
export type Ngos = {
  __typename?: 'ngos';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** All offers */
export type Offers = {
  __typename?: 'offers';
  /** Self descriptive. */
  desc: Scalars['String'];
  /** Self descriptive. */
  id: Scalars['String'];
  /** Self descriptive. */
  target: Scalars['String'];
};

/** For a supervisor login, get the supervisors data */
export type Supervisor_Get = {
  __typename?: 'supervisor_get';
  /** Self descriptive. */
  contacts: Contacts;
  /** Self descriptive. */
  id: Scalars['String'];
  languages: Array<Scalars['String']>;
  /** Self descriptive. */
  location: Location;
  /** Self descriptive. */
  name_full: Scalars['String'];
  /** Self descriptive. */
  ngos: Scalars['NgoRefs'];
  offers: Array<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  text_specialization?: Maybe<Scalars['String']>;
};

/** All supervisor visible with the used credentials */
export type Supervisors = {
  __typename?: 'supervisors';
  /** Self descriptive. */
  contacts: Contacts;
  /** Self descriptive. */
  id: Scalars['String'];
  languages: Array<Scalars['String']>;
  /** Self descriptive. */
  location: Location;
  /** Self descriptive. */
  name_full: Scalars['String'];
  /** Self descriptive. */
  ngos: Scalars['NgoRefs'];
  offers: Array<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  text_specialization?: Maybe<Scalars['String']>;
};

export type Supervisors_Registered = {
  __typename?: 'supervisors_registered';
  /** Self descriptive. */
  mail: Scalars['String'];
  name_full?: Maybe<Scalars['String']>;
};

export type LoginQueryVariables = Exact<{
  auth: Auth;
}>;


export type LoginQuery = { __typename?: 'QueryType', login: { __typename?: 'login', jwt?: string | null | undefined } };

export type LanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type LanguagesQuery = { __typename?: 'QueryType', languages: Array<{ __typename?: 'languages', id: string, name: string, flag_url: string, idx: number }> };

export type LookupQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
}>;


export type LookupQuery = { __typename?: 'QueryType', lookup: { __typename?: 'lookup', valid: boolean, ngo?: { __typename?: 'ngo', name?: string | null | undefined } | null | undefined, supervisors?: Array<{ __typename?: 'supervisors', id: string, name_full: string, photo?: string | null | undefined, languages: Array<string>, offers: Array<string>, text?: string | null | undefined, contacts: { __typename?: 'Contacts', phone?: string | null | undefined, email?: string | null | undefined, website?: string | null | undefined } }> | null | undefined }, languages: Array<{ __typename?: 'languages', id: string, name: string, flag_url: string, idx: number }>, offers: Array<{ __typename?: 'offers', id: string, target: string, desc: string }> };

export type SupervisorGetQueryVariables = Exact<{
  auth: Auth;
}>;


export type SupervisorGetQuery = { __typename?: 'QueryType', supervisor_get?: { __typename?: 'supervisor_get', id: string, ngos: any, name_full: string, languages: Array<string>, offers: Array<string>, photo?: string | null | undefined, text_specialization?: string | null | undefined, text?: string | null | undefined, contacts: { __typename?: 'Contacts', phone?: string | null | undefined, website?: string | null | undefined, email?: string | null | undefined }, location: { __typename?: 'Location', zip?: string | null | undefined } } | null | undefined, languages: Array<{ __typename?: 'languages', id: string, name: string, flag_url: string, idx: number }>, offers: Array<{ __typename?: 'offers', id: string, target: string, desc: string }>, ngos: Array<{ __typename?: 'ngos', id?: string | null | undefined, name?: string | null | undefined }> };

export type NgoQueryVariables = Exact<{
  auth: Auth;
}>;


export type NgoQuery = { __typename?: 'QueryType', created_tokens: Array<{ __typename?: 'created_tokens', token: string, purpose?: string | null | undefined }>, supervisors_registered: Array<{ __typename?: 'supervisors_registered', mail: string, name_full?: string | null | undefined }> };


export const LoginDocument = `
    query Login($auth: Auth!) {
  login(auth: $auth) {
    jwt
  }
}
    `;
export const useLoginQuery = <
      TData = LoginQuery,
      TError = unknown
    >(
      variables: LoginQueryVariables,
      options?: UseQueryOptions<LoginQuery, TError, TData>
    ) =>
    useQuery<LoginQuery, TError, TData>(
      ['Login', variables],
      fetcher<LoginQuery, LoginQueryVariables>(LoginDocument, variables),
      options
    );
export const LanguagesDocument = `
    query Languages {
  languages {
    id
    name
    flag_url
    idx
  }
}
    `;
export const useLanguagesQuery = <
      TData = LanguagesQuery,
      TError = unknown
    >(
      variables?: LanguagesQueryVariables,
      options?: UseQueryOptions<LanguagesQuery, TError, TData>
    ) =>
    useQuery<LanguagesQuery, TError, TData>(
      variables === undefined ? ['Languages'] : ['Languages', variables],
      fetcher<LanguagesQuery, LanguagesQueryVariables>(LanguagesDocument, variables),
      options
    );
export const LookupDocument = `
    query Lookup($token: String = "R4nd0m") {
  lookup(token: $token) {
    valid
    ngo {
      name
    }
    supervisors {
      id
      name_full
      photo
      languages
      offers
      contacts {
        phone
        email
        website
      }
      text
    }
  }
  languages {
    id
    name
    flag_url
    idx
  }
  offers {
    id
    target
    desc
  }
}
    `;
export const useLookupQuery = <
      TData = LookupQuery,
      TError = unknown
    >(
      variables?: LookupQueryVariables,
      options?: UseQueryOptions<LookupQuery, TError, TData>
    ) =>
    useQuery<LookupQuery, TError, TData>(
      variables === undefined ? ['Lookup'] : ['Lookup', variables],
      fetcher<LookupQuery, LookupQueryVariables>(LookupDocument, variables),
      options
    );
export const SupervisorGetDocument = `
    query SupervisorGet($auth: Auth!) {
  supervisor_get(auth: $auth) {
    id
    ngos
    name_full
    languages
    offers
    contacts {
      phone
      website
      email
    }
    location {
      zip
    }
    photo
    text_specialization
    text
  }
  languages {
    id
    name
    flag_url
    idx
  }
  offers {
    id
    target
    desc
  }
  ngos(auth: $auth) {
    id
    name
  }
}
    `;
export const useSupervisorGetQuery = <
      TData = SupervisorGetQuery,
      TError = unknown
    >(
      variables: SupervisorGetQueryVariables,
      options?: UseQueryOptions<SupervisorGetQuery, TError, TData>
    ) =>
    useQuery<SupervisorGetQuery, TError, TData>(
      ['SupervisorGet', variables],
      fetcher<SupervisorGetQuery, SupervisorGetQueryVariables>(SupervisorGetDocument, variables),
      options
    );
export const NgoDocument = `
    query Ngo($auth: Auth!) {
  created_tokens(auth: $auth) {
    token
    purpose
  }
  supervisors_registered(auth: $auth) {
    mail
    name_full
  }
}
    `;
export const useNgoQuery = <
      TData = NgoQuery,
      TError = unknown
    >(
      variables: NgoQueryVariables,
      options?: UseQueryOptions<NgoQuery, TError, TData>
    ) =>
    useQuery<NgoQuery, TError, TData>(
      ['Ngo', variables],
      fetcher<NgoQuery, NgoQueryVariables>(NgoDocument, variables),
      options
    );