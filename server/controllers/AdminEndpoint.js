'use strict';

var utils = require('../utils/writer.js');
var AdminEndpoint = require('../service/AdminEndpointService');

module.exports.deleteEventOrganizersSuspend = function deleteEventOrganizersSuspend (req, res, next, id_event_organizer) {
  AdminEndpoint.deleteEventOrganizersSuspend(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteEventOrganizersTerminateId_event_organizer = function deleteEventOrganizersTerminateId_event_organizer (req, res, next, id_event_organizer) {
  AdminEndpoint.deleteEventOrganizersTerminateId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteEventOrganizersVerifyId_event_organizer = function deleteEventOrganizersVerifyId_event_organizer (req, res, next, id_event_organizer) {
  AdminEndpoint.deleteEventOrganizersVerifyId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsersSuspend = function deleteUsersSuspend (req, res, next, id_user) {
  AdminEndpoint.deleteUsersSuspend(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsersTerminateId_user = function deleteUsersTerminateId_user (req, res, next, id_user) {
  AdminEndpoint.deleteUsersTerminateId_user(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdminsId_admin = function getAdminsId_admin (req, res, next, id_admin) {
  AdminEndpoint.getAdminsId_admin(id_admin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdminsRefreshTokens = function getAdminsRefreshTokens (req, res, next, id_admin) {
  AdminEndpoint.getAdminsRefreshTokens(id_admin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRefreshTokens = function getRefreshTokens (req, res, next, id_user) {
  AdminEndpoint.getRefreshTokens(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReservations = function getReservations (req, res, next, q, h) {
  AdminEndpoint.getReservations(q, h)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsers = function getUsers (req, res, next, q, h) {
  AdminEndpoint.getUsers(q, h)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postAdminsAuthenticate = function postAdminsAuthenticate (req, res, next, body) {
  AdminEndpoint.postAdminsAuthenticate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postAdminsRefreshToken = function postAdminsRefreshToken (req, res, next, refreshToken) {
  AdminEndpoint.postAdminsRefreshToken(refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postAdminsRevokeToken = function postAdminsRevokeToken (req, res, next, body, refreshToken) {
  AdminEndpoint.postAdminsRevokeToken(body, refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postEventOrganizersWarnId_event_organizer = function postEventOrganizersWarnId_event_organizer (req, res, next, body, id_event_organizer) {
  AdminEndpoint.postEventOrganizersWarnId_event_organizer(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersWarnId_user = function postUsersWarnId_user (req, res, next, body, id_user) {
  AdminEndpoint.postUsersWarnId_user(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersSuspend = function putEventOrganizersSuspend (req, res, next, body, id_event_organizer) {
  AdminEndpoint.putEventOrganizersSuspend(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersTerminateId_event_organizer = function putEventOrganizersTerminateId_event_organizer (req, res, next, body, id_event_organizer) {
  AdminEndpoint.putEventOrganizersTerminateId_event_organizer(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersVerifyId_event_organizer = function putEventOrganizersVerifyId_event_organizer (req, res, next, id_event_organizer) {
  AdminEndpoint.putEventOrganizersVerifyId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersSuspend = function putUsersSuspend (req, res, next, body, id_user) {
  AdminEndpoint.putUsersSuspend(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersTerminateId_user = function putUsersTerminateId_user (req, res, next, body, id_user) {
  AdminEndpoint.putUsersTerminateId_user(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.revokeToken = function revokeToken (req, res, next, body, refreshToken) {
  AdminEndpoint.revokeToken(body, refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
