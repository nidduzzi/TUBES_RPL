'use strict';

var utils = require('../utils/writer.js');
var Webhook = require('../service/WebhookService');

module.exports.putPaymentsId_payment = function putPaymentsId_payment (req, res, next, body, id_payment) {
  Webhook.putPaymentsId_payment(body, id_payment)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
