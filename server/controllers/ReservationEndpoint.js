'use strict';

var utils = require('../utils/writer.js');
var ReservationEndpoint = require('../service/ReservationEndpointService');

module.exports.deleteReservationsCancelId_reservation = function deleteReservationsCancelId_reservation (req, res, next, id_reservation) {
  ReservationEndpoint.deleteReservationsCancelId_reservation(id_reservation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteReservationsConfirmId_reservation = function deleteReservationsConfirmId_reservation (req, res, next, id_reservation) {
  ReservationEndpoint.deleteReservationsConfirmId_reservation(id_reservation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventsId_eventReservations = function getEventsId_eventReservations (req, res, next, id_event) {
  ReservationEndpoint.getEventsId_eventReservations(id_event)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReservationsId_reservation = function getReservationsId_reservation (req, res, next, id_reservation) {
  ReservationEndpoint.getReservationsId_reservation(id_reservation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersId_userReservations = function getUsersId_userReservations (req, res, next, id_user) {
  ReservationEndpoint.getUsersId_userReservations(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postReservations = function postReservations (req, res, next, body) {
  ReservationEndpoint.postReservations(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putReservationsCancelId_reservation = function putReservationsCancelId_reservation (req, res, next, id_reservation) {
  ReservationEndpoint.putReservationsCancelId_reservation(id_reservation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putReservationsConfirmId_reservation = function putReservationsConfirmId_reservation (req, res, next, body, id_reservation) {
  ReservationEndpoint.putReservationsConfirmId_reservation(body, id_reservation)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
