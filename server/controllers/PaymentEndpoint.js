'use strict';

var utils = require('../utils/writer.js');
var PaymentEndpoint = require('../service/PaymentEndpointService');

module.exports.getPaymentsId_payment = function getPaymentsId_payment (req, res, next, id_payment) {
  PaymentEndpoint.getPaymentsId_payment(id_payment)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postPayments = function postPayments (req, res, next, body) {
  PaymentEndpoint.postPayments(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
