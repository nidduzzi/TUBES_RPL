'use strict';

var utils = require('../utils/writer.js');
var UserEndpoint = require('../service/UserEndpointService');

module.exports.authenticate = function authenticate (req, res, next, body) {
  UserEndpoint.authenticate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteEventOrganizersSuspend = function deleteEventOrganizersSuspend (req, res, next, id_event_organizer) {
  UserEndpoint.deleteEventOrganizersSuspend(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteEventOrganizersTerminateId_event_organizer = function deleteEventOrganizersTerminateId_event_organizer (req, res, next, id_event_organizer) {
  UserEndpoint.deleteEventOrganizersTerminateId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsersSuspend = function deleteUsersSuspend (req, res, next, id_user) {
  UserEndpoint.deleteUsersSuspend(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsersTerminateId_user = function deleteUsersTerminateId_user (req, res, next, id_user) {
  UserEndpoint.deleteUsersTerminateId_user(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRefreshTokens = function getRefreshTokens (req, res, next, id_user) {
  UserEndpoint.getRefreshTokens(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsers = function getUsers (req, res, next, q, h) {
  UserEndpoint.getUsers(q, h)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersId_userReservations = function getUsersId_userReservations (req, res, next, id_user) {
  UserEndpoint.getUsersId_userReservations(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersUserId = function getUsersUserId (req, res, next, id_user) {
  UserEndpoint.getUsersUserId(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersVerifyEmailVerificationToken = function getUsersVerifyEmailVerificationToken (req, res, next, verification_token) {
  UserEndpoint.getUsersVerifyEmailVerificationToken(verification_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postEventOrganizersWarnId_event_organizer = function postEventOrganizersWarnId_event_organizer (req, res, next, body, id_event_organizer) {
  UserEndpoint.postEventOrganizersWarnId_event_organizer(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUser = function postUser (req, res, next, body) {
  UserEndpoint.postUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersWarnId_user = function postUsersWarnId_user (req, res, next, body, id_user) {
  UserEndpoint.postUsersWarnId_user(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersSuspend = function putEventOrganizersSuspend (req, res, next, body, id_event_organizer) {
  UserEndpoint.putEventOrganizersSuspend(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersTerminateId_event_organizer = function putEventOrganizersTerminateId_event_organizer (req, res, next, body, id_event_organizer) {
  UserEndpoint.putEventOrganizersTerminateId_event_organizer(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersId_user = function putUsersId_user (req, res, next, id_user) {
  UserEndpoint.putUsersId_user(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersSuspend = function putUsersSuspend (req, res, next, body, id_user) {
  UserEndpoint.putUsersSuspend(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersTerminateId_user = function putUsersTerminateId_user (req, res, next, body, id_user) {
  UserEndpoint.putUsersTerminateId_user(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.refreshToken = function refreshToken (req, res, next, refreshToken) {
  UserEndpoint.refreshToken(refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.revokeToken = function revokeToken (req, res, next, body, refreshToken) {
  UserEndpoint.revokeToken(body, refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
