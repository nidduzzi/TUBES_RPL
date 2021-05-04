'use strict';

var utils = require('../utils/writer.js');
var EventOrganizerEndpoint = require('../service/EventOrganizerEndpointService');

module.exports.deleteEventOrganizersVerifyId_event_organizer = function deleteEventOrganizersVerifyId_event_organizer (req, res, next, id_event_organizer) {
  EventOrganizerEndpoint.deleteEventOrganizersVerifyId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventOrganizers = function getEventOrganizers (req, res, next, q, h) {
  EventOrganizerEndpoint.getEventOrganizers(q, h)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventOrganizersId_event_organizer = function getEventOrganizersId_event_organizer (req, res, next, id_event_organizer) {
  EventOrganizerEndpoint.getEventOrganizersId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventOrganizersId_event_organizerEvents = function getEventOrganizersId_event_organizerEvents (req, res, next, id_event_organizer) {
  EventOrganizerEndpoint.getEventOrganizersId_event_organizerEvents(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventOrganizersVerifyEmailVerification_token = function getEventOrganizersVerifyEmailVerification_token (req, res, next, verification_token) {
  EventOrganizerEndpoint.getEventOrganizersVerifyEmailVerification_token(verification_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postEventOrganizers = function postEventOrganizers (req, res, next, body) {
  EventOrganizerEndpoint.postEventOrganizers(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersId_event_organizer = function putEventOrganizersId_event_organizer (req, res, next, id_event_organizer) {
  EventOrganizerEndpoint.putEventOrganizersId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventOrganizersVerifyId_event_organizer = function putEventOrganizersVerifyId_event_organizer (req, res, next, id_event_organizer) {
  EventOrganizerEndpoint.putEventOrganizersVerifyId_event_organizer(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
