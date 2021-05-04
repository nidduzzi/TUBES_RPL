'use strict';


/**
 * Unsuspend a Suspended Event Organizer by id
 * Remove an event organizer from the suspended list.
 *
 * id_event_organizer Integer 
 * no response value expected for this operation
 **/
exports.deleteEventOrganizersSuspend = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Remove Event Organizer from Terminate list by id
 * Remove event organizer from the terminated event organizer list
 *
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.deleteEventOrganizersTerminateId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Unverify Event Organizer
 * Remove event organizer from verified list by Admin
 *
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.deleteEventOrganizersVerifyId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Unsuspend a Suspended User by id
 * Remove a user from the suspended list.
 *
 * id_user Integer 
 * no response value expected for this operation
 **/
exports.deleteUsersSuspend = function(id_user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Remove user termination by id
 * Remove user from the terminated users list
 *
 * id_user String 
 * no response value expected for this operation
 **/
exports.deleteUsersTerminateId_user = function(id_user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get Admin details by id
 * Retrieve the account information of an admin
 *
 * id_admin String 
 * returns inline_response_200_15
 **/
exports.getAdminsId_admin = function(id_admin) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "admin" : {
    "id" : 0,
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
 * Query reservations
 * Admins can query the list of reservations
 *
 * q String query condition JSON string (optional)
 * h String query format JSON string (optional)
 * returns inline_response_200_7
 **/
exports.getReservations = function(q,h) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reservations" : [ {
    "numTickets" : 5,
    "tickets" : [ {
      "nama" : "nama",
      "identificationNumber" : "identificationNumber",
      "id_ticket_type" : 5,
      "id" : 1,
      "indentificaitionType" : "KTP"
    }, {
      "nama" : "nama",
      "identificationNumber" : "identificationNumber",
      "id_ticket_type" : 5,
      "id" : 1,
      "indentificaitionType" : "KTP"
    } ],
    "price" : 2,
    "currency" : "currency",
    "id" : 0,
    "id_user" : 6,
    "confirmed" : true
  }, {
    "numTickets" : 5,
    "tickets" : [ {
      "nama" : "nama",
      "identificationNumber" : "identificationNumber",
      "id_ticket_type" : 5,
      "id" : 1,
      "indentificaitionType" : "KTP"
    }, {
      "nama" : "nama",
      "identificationNumber" : "identificationNumber",
      "id_ticket_type" : 5,
      "id" : 1,
      "indentificaitionType" : "KTP"
    } ],
    "price" : 2,
    "currency" : "currency",
    "id" : 0,
    "id_user" : 6,
    "confirmed" : true
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Query Users
 * Query list of users for Admin
 *
 * q String query condition JSON string (optional)
 * h String query format JSON string (optional)
 * returns inline_response_200
 **/
exports.getUsers = function(q,h) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "users" : [ {
    "emailVerified" : true,
    "profilePicture" : "",
    "ragistrationDate" : "2000-01-23",
    "id" : 0,
    "email" : "",
    "username" : "username"
  }, {
    "emailVerified" : true,
    "profilePicture" : "",
    "ragistrationDate" : "2000-01-23",
    "id" : 0,
    "email" : "",
    "username" : "username"
  } ]
};
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
 * Warn an Event Organizer by id
 * Admins can warn event organizers of anything that is considered a breach of TOS, Policy, Guidelines, etc.
 *
 * body Body_17 Description of the breach and the moderating admin. (optional)
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.postEventOrganizersWarnId_event_organizer = function(body,id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Warn a User by id
 * Admins can warn users of anything that is considered a breach of TOS, Policy, Guidelines, etc.
 *
 * body Body_4 Description of the breach and the moderating admin. (optional)
 * id_user String 
 * no response value expected for this operation
 **/
exports.postUsersWarnId_user = function(body,id_user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Suspend an Existing Event Organizer by id
 * Admins can suspend a Event Organizer for a specific amount of time as specified in policy.
 *
 * body Body_16 Details of event organizer suspension  (optional)
 * id_event_organizer Integer 
 * returns inline_response_200_3
 **/
exports.putEventOrganizersSuspend = function(body,id_event_organizer) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "suspensionLength" : "suspensionLength",
  "policy_breach" : "policy_breach",
  "id_admin" : 0,
  "description" : "description"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Terminate an Existing Event Organizers by id
 * Admins put existing event organizers on the terminated users list
 *
 * body Body_15  (optional)
 * id_event_organizer String 
 * returns inline_response_200_14
 **/
exports.putEventOrganizersTerminateId_event_organizer = function(body,id_event_organizer) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "policy_breach" : "policy_breach",
  "id_admin" : 0,
  "description" : "description"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Verify Event Organizer by id
 * Put event organizer on verified list by Admin
 *
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.putEventOrganizersVerifyId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Suspend an Existing User by id
 * Admins can suspend a user for a specific amount of time as specified in policy.
 *
 * body Body_3 Details of user suspension  (optional)
 * id_user Integer 
 * returns inline_response_200_3
 **/
exports.putUsersSuspend = function(body,id_user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "suspensionLength" : "suspensionLength",
  "policy_breach" : "policy_breach",
  "id_admin" : 0,
  "description" : "description"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Terminate an Existing User by id
 * Admins put existing user on the terminated users list
 *
 * body Body_2  (optional)
 * id_user String 
 * returns inline_response_200_2
 **/
exports.putUsersTerminateId_user = function(body,id_user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "policy_breach" : "policy_breach",
  "id_admin" : "id_admin",
  "description" : "description"
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

