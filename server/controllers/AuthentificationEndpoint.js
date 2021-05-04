'use strict';

var utils = require('../utils/writer.js');
var AuthentificationEndpoint = require('../service/AuthentificationEndpointService');

module.exports.authenticate = function authenticate (req, res, next, body) {
  AuthentificationEndpoint.authenticate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAdminsRefreshTokens = function getAdminsRefreshTokens (req, res, next, id_admin) {
  AuthentificationEndpoint.getAdminsRefreshTokens(id_admin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRefreshTokens = function getRefreshTokens (req, res, next, id_user) {
  AuthentificationEndpoint.getRefreshTokens(id_user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postAdminsAuthenticate = function postAdminsAuthenticate (req, res, next, body) {
  AuthentificationEndpoint.postAdminsAuthenticate(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postAdminsRefreshToken = function postAdminsRefreshToken (req, res, next, refreshToken) {
  AuthentificationEndpoint.postAdminsRefreshToken(refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postAdminsRevokeToken = function postAdminsRevokeToken (req, res, next, body, refreshToken) {
  AuthentificationEndpoint.postAdminsRevokeToken(body, refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.refreshToken = function refreshToken (req, res, next, refreshToken) {
  AuthentificationEndpoint.refreshToken(refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.revokeToken = function revokeToken (req, res, next, body, refreshToken) {
  AuthentificationEndpoint.revokeToken(body, refreshToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
