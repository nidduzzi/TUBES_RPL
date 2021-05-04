'use strict';


/**
 * Authenticate User and return a JWT token and a cookie with a refresh token
 * Authentification based on user credentials
 *
 * body Body_5 User Credentials
 * returns inline_response_200_4
 **/
exports.authenticate = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "auth" : {
    "jwtToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y",
    "id" : 1,
    "username" : "username"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a list of all refresh tokens (active and revoked) of the admin by id
 * Admin users can access any user's refresh tokens, regular users are restricted to their own refresh tokens.
 *
 * id_admin String Admin Id
 * returns List
 **/
exports.getAdminsRefreshTokens = function(id_admin) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "expires" : "2020-06-24T03:29:13.871Z",
  "createdByIp" : "127.0.0.1",
  "replacedByToken" : "a01d3818db64961742f249beeded65739e9c3d1019570ea48ea820d274eac607043a6cbefd23c297",
  "created" : "2020-06-17T03:29:13.871Z",
  "revokedByIp" : "127.0.0.1",
  "isExpired" : false,
  "isActive" : true,
  "revoked" : "2020-06-17T03:29:13.871Z",
  "token" : "79ea9a5e825da7c27d30839c89295071842f2a44b22e917aaf795126f4486509d8511c6fdedb6f1e"
}, {
  "expires" : "2020-06-24T03:29:13.871Z",
  "createdByIp" : "127.0.0.1",
  "replacedByToken" : "a01d3818db64961742f249beeded65739e9c3d1019570ea48ea820d274eac607043a6cbefd23c297",
  "created" : "2020-06-17T03:29:13.871Z",
  "revokedByIp" : "127.0.0.1",
  "isExpired" : false,
  "isActive" : true,
  "revoked" : "2020-06-17T03:29:13.871Z",
  "token" : "79ea9a5e825da7c27d30839c89295071842f2a44b22e917aaf795126f4486509d8511c6fdedb6f1e"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a list of all refresh tokens (active and revoked) of the user by id
 * Admin users can access any user's refresh tokens, regular users are restricted to their own refresh tokens.
 *
 * id_user String User id
 * returns List
 **/
exports.getRefreshTokens = function(id_user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "expires" : "2020-06-24T03:29:13.871Z",
  "createdByIp" : "127.0.0.1",
  "replacedByToken" : "a01d3818db64961742f249beeded65739e9c3d1019570ea48ea820d274eac607043a6cbefd23c297",
  "created" : "2020-06-17T03:29:13.871Z",
  "revokedByIp" : "127.0.0.1",
  "isExpired" : false,
  "isActive" : true,
  "revoked" : "2020-06-17T03:29:13.871Z",
  "token" : "79ea9a5e825da7c27d30839c89295071842f2a44b22e917aaf795126f4486509d8511c6fdedb6f1e"
}, {
  "expires" : "2020-06-24T03:29:13.871Z",
  "createdByIp" : "127.0.0.1",
  "replacedByToken" : "a01d3818db64961742f249beeded65739e9c3d1019570ea48ea820d274eac607043a6cbefd23c297",
  "created" : "2020-06-17T03:29:13.871Z",
  "revokedByIp" : "127.0.0.1",
  "isExpired" : false,
  "isActive" : true,
  "revoked" : "2020-06-17T03:29:13.871Z",
  "token" : "79ea9a5e825da7c27d30839c89295071842f2a44b22e917aaf795126f4486509d8511c6fdedb6f1e"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Authenticate Admin and return a JWT token and a cookie with a refresh token
 * Authentification based on Admin credentials
 *
 * body Body_18 Admin Credentials
 * returns inline_response_200_4
 **/
exports.postAdminsAuthenticate = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "auth" : {
    "jwtToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y",
    "id" : 1,
    "username" : "username"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Refresh Admin JWT token and get a new refresh token
 * The refresh token is sent and returned via cookies.
 *
 * refreshToken String The `refreshToken` cookie (optional)
 * returns inline_response_200_4
 **/
exports.postAdminsRefreshToken = function(refreshToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "auth" : {
    "jwtToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y",
    "id" : 1,
    "username" : "username"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Revoke an Admin refresh token
 * Admin users can revoke the tokens of any user, regular users can only revoke their own tokens.
 *
 * body Body_19  (optional)
 * refreshToken String The refresh token can be sent in a cookie or the post body, if both are sent the token in the body is used. (optional)
 * returns inline_response_200_5
 **/
exports.postAdminsRevokeToken = function(body,refreshToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Token revoked"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Refresh User JWT token and get a new refresh token
 * The refresh token is sent and returned via cookies.
 *
 * refreshToken String The `refreshToken` cookie (optional)
 * returns inline_response_200_4
 **/
exports.refreshToken = function(refreshToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "auth" : {
    "jwtToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxMmUxOTdlMDZhNzZjY2RlZmMxMjEiLCJpZCI6IjVlYjEyZTE5N2UwNmE3NmNjZGVmYzEyMSIsImlhdCI6MTU4ODc1ODE1N30.xR9H0STbFOpSkuGA9jHNZOJ6eS7umHHqKRhI807YT1Y",
    "id" : 1,
    "username" : "username"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Revoke a refresh token
 * Admin users can revoke the tokens of any user, regular users can only revoke their own tokens.
 *
 * body Body_6  (optional)
 * refreshToken String The refresh token can be sent in a cookie or the post body, if both are sent the token in the body is used. (optional)
 * returns inline_response_200_5
 **/
exports.revokeToken = function(body,refreshToken) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Token revoked"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

