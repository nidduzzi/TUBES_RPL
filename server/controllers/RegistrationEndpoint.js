'use strict';

var utils = require('../utils/writer.js');
var RegistrationEndpoint = require('../service/RegistrationEndpointService');

module.exports.getEventOrganizersVerifyEmailVerification_token = function getEventOrganizersVerifyEmailVerification_token (req, res, next, verification_token) {
  RegistrationEndpoint.getEventOrganizersVerifyEmailVerification_token(verification_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersVerifyEmailVerificationToken = function getUsersVerifyEmailVerificationToken (req, res, next, verification_token) {
  RegistrationEndpoint.getUsersVerifyEmailVerificationToken(verification_token)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postEventOrganizers = function postEventOrganizers (req, res, next, body) {
  RegistrationEndpoint.postEventOrganizers(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUser = function postUser (req, res, next, body) {
  RegistrationEndpoint.postUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
