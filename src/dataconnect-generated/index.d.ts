import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetNewsletterSubscriptionsData {
  newsletterSubscriptions: ({
    id: UUIDString;
    email: string;
    source?: string | null;
    subscribedAt: TimestampString;
  } & NewsletterSubscription_Key)[];
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  } & User_Key)[];
}

export interface NewsletterSubscription_Key {
  id: UUIDString;
  __typename?: 'NewsletterSubscription_Key';
}

export interface SubscribeNewsletterData {
  newsletterSubscription_insert: NewsletterSubscription_Key;
}

export interface SubscribeNewsletterVariables {
  email: string;
  source: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect): QueryPromise<ListUsersData, undefined>;

interface SubscribeNewsletterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubscribeNewsletterVariables): MutationRef<SubscribeNewsletterData, SubscribeNewsletterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubscribeNewsletterVariables): MutationRef<SubscribeNewsletterData, SubscribeNewsletterVariables>;
  operationName: string;
}
export const subscribeNewsletterRef: SubscribeNewsletterRef;

export function subscribeNewsletter(vars: SubscribeNewsletterVariables): MutationPromise<SubscribeNewsletterData, SubscribeNewsletterVariables>;
export function subscribeNewsletter(dc: DataConnect, vars: SubscribeNewsletterVariables): MutationPromise<SubscribeNewsletterData, SubscribeNewsletterVariables>;

interface GetNewsletterSubscriptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetNewsletterSubscriptionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetNewsletterSubscriptionsData, undefined>;
  operationName: string;
}
export const getNewsletterSubscriptionsRef: GetNewsletterSubscriptionsRef;

export function getNewsletterSubscriptions(): QueryPromise<GetNewsletterSubscriptionsData, undefined>;
export function getNewsletterSubscriptions(dc: DataConnect): QueryPromise<GetNewsletterSubscriptionsData, undefined>;

