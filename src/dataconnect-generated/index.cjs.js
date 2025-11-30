const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'eakc',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const listUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers');
}
listUsersRef.operationName = 'ListUsers';
exports.listUsersRef = listUsersRef;

exports.listUsers = function listUsers(dc) {
  return executeQuery(listUsersRef(dc));
};

const subscribeNewsletterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubscribeNewsletter', inputVars);
}
subscribeNewsletterRef.operationName = 'SubscribeNewsletter';
exports.subscribeNewsletterRef = subscribeNewsletterRef;

exports.subscribeNewsletter = function subscribeNewsletter(dcOrVars, vars) {
  return executeMutation(subscribeNewsletterRef(dcOrVars, vars));
};

const getNewsletterSubscriptionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNewsletterSubscriptions');
}
getNewsletterSubscriptionsRef.operationName = 'GetNewsletterSubscriptions';
exports.getNewsletterSubscriptionsRef = getNewsletterSubscriptionsRef;

exports.getNewsletterSubscriptions = function getNewsletterSubscriptions(dc) {
  return executeQuery(getNewsletterSubscriptionsRef(dc));
};
