import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

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

/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to execute without passing in DataConnect. */
export function createUser(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;
/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function createUser(options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;

/** Generated Node Admin SDK operation action function for the 'ListUsers' Query. Allow users to execute without passing in DataConnect. */
export function listUsers(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListUsersData>>;
/** Generated Node Admin SDK operation action function for the 'ListUsers' Query. Allow users to pass in custom DataConnect instances. */
export function listUsers(options?: OperationOptions): Promise<ExecuteOperationResponse<ListUsersData>>;

/** Generated Node Admin SDK operation action function for the 'SubscribeNewsletter' Mutation. Allow users to execute without passing in DataConnect. */
export function subscribeNewsletter(dc: DataConnect, vars: SubscribeNewsletterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubscribeNewsletterData>>;
/** Generated Node Admin SDK operation action function for the 'SubscribeNewsletter' Mutation. Allow users to pass in custom DataConnect instances. */
export function subscribeNewsletter(vars: SubscribeNewsletterVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubscribeNewsletterData>>;

/** Generated Node Admin SDK operation action function for the 'GetNewsletterSubscriptions' Query. Allow users to execute without passing in DataConnect. */
export function getNewsletterSubscriptions(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetNewsletterSubscriptionsData>>;
/** Generated Node Admin SDK operation action function for the 'GetNewsletterSubscriptions' Query. Allow users to pass in custom DataConnect instances. */
export function getNewsletterSubscriptions(options?: OperationOptions): Promise<ExecuteOperationResponse<GetNewsletterSubscriptionsData>>;

