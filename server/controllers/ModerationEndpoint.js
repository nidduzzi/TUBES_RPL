'use strict';

var utils = require('../utils/writer.js');
var ModerationEndpoint = require('../service/ModerationEndpointService');

module.exports.deleteEventOrganizersTerminateId_event_organizer = function deleteEventOrganizersTerminateId_event_organizer (req, res, next, id_event_organizer) {
  ModerationEndpoint.deleteEventOrganizersTerminateId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsersTerminateId_user = function deleteUsersTerminateId_user (req, res, next, id_user) {
  ModerationEndpoint.deleteUsersTerminateId_user(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postEventOrganizersWarnId_event_organizer = function postEventOrganizersWarnId_event_organizer (req, res, next, body, id_event_organizer) {
  ModerationEndpoint.postEventOrganizersWarnId_event_organizer(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersWarnId_user = function postUsersWarnId_user (req, res, next, body, id_user) {
  ModerationEndpoint.postUsersWarnId_user(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersSuspend = function putEventOrganizersSuspend (req, res, next, body, id_event_organizer) {
  ModerationEndpoint.putEventOrganizersSuspend(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersTerminateId_event_organizer = function putEventOrganizersTerminateId_event_organizer (req, res, next, body, id_event_organizer) {
  ModerationEndpoint.putEventOrganizersTerminateId_event_organizer(body, id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersSuspend = function putUsersSuspend (req, res, next, body, id_user) {
  ModerationEndpoint.putUsersSuspend(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersTerminateId_user = function putUsersTerminateId_user (req, res, next, body, id_user) {
  ModerationEndpoint.putUsersTerminateId_user(body, id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
