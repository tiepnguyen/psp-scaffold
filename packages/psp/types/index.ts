export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type CreatePostInput = {
  status: InputMaybe<Status>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};

export type Post = {
  __typename?: 'Post';
  createdDate: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  status: Maybe<Status>;
  title: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  post: Maybe<Post>;
  posts: Maybe<Array<Maybe<Post>>>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};

export const Status = {
  Archived: 'ARCHIVED',
  Draft: 'DRAFT',
  Published: 'PUBLISHED'
} as const;

export type Status = typeof Status[keyof typeof Status];
export type Subscription = {
  __typename?: 'Subscription';
  postCreated: Maybe<Post>;
};
