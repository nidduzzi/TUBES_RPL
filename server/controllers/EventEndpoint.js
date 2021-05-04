'use strict';

var utils = require('../utils/writer.js');
var EventEndpoint = require('../service/EventEndpointService');

module.exports.getEventOrganizersId_event_organizerEvents = function getEventOrganizersId_event_organizerEvents (req, res, next, id_event_organizer) {
  EventEndpoint.getEventOrganizersId_event_organizerEvents(id_event_organizer)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEvents = function getEvents (req, res, next, q, h) {
  EventEndpoint.getEvents(q, h)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventsId_event = function getEventsId_event (req, res, next, id_event) {
  EventEndpoint.getEventsId_event(id_event)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventsId_eventReservations = function getEventsId_eventReservations (req, res, next, id_event) {
  EventEndpoint.getEventsId_eventReservations(id_event)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postEvents = function postEvents (req, res, next) {
  EventEndpoint.postEvents()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putEventsId_event = function putEventsId_event (req, res, next, body, id_event) {
  EventEndpoint.putEventsId_event(body, id_event)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
