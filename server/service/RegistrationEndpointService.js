'use strict';


/**
 * Verify Event Organizer Email
 * Verify event organizer email by sending request with verification token sent to email
 *
 * verification_token String 
 * returns inline_response_409
 **/
exports.getEventOrganizersVerifyEmailVerification_token = function(verification_token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Verify User Email
 * Verify user email by sending request with verification token sent to email
 *
 * verification_token String 
 * returns inline_response_409
 **/
exports.getUsersVerifyEmailVerificationToken = function(verification_token) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a New Event Organizer
 * Create a new event organizer to be verified by admin.
 *
 * body Body_13  (optional)
 * no response value expected for this operation
 **/
exports.postEventOrganizers = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create New User
 * Create a new user.
 *
 * body Body Post the necessary fields for the API to create a new user. (optional)
 * returns User
 **/
exports.postUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "emailVerified" : true,
  "profilePicture" : "",
  "ragistrationDate" : "2000-01-23",
  "id" : 0,
  "email" : "",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

