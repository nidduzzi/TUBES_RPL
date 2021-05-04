'use strict';


/**
 * Remove Event Organizer from Terminate list by id
 * Remove event organizer from the terminated event organizer list
 *
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.deleteEventOrganizersTerminateId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Remove user termination by id
 * Remove user from the terminated users list
 *
 * id_user String 
 * no response value expected for this operation
 **/
exports.deleteUsersTerminateId_user = function(id_user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Warn an Event Organizer by id
 * Admins can warn event organizers of anything that is considered a breach of TOS, Policy, Guidelines, etc.
 *
 * body Body_17 Description of the breach and the moderating admin. (optional)
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.postEventOrganizersWarnId_event_organizer = function(body,id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Warn a User by id
 * Admins can warn users of anything that is considered a breach of TOS, Policy, Guidelines, etc.
 *
 * body Body_4 Description of the breach and the moderating admin. (optional)
 * id_user String 
 * no response value expected for this operation
 **/
exports.postUsersWarnId_user = function(body,id_user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Suspend an Existing Event Organizer by id
 * Admins can suspend a Event Organizer for a specific amount of time as specified in policy.
 *
 * body Body_16 Details of event organizer suspension  (optional)
 * id_event_organizer Integer 
 * returns inline_response_200_3
 **/
exports.putEventOrganizersSuspend = function(body,id_event_organizer) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "suspensionLength" : "suspensionLength",
  "policy_breach" : "policy_breach",
  "id_admin" : 0,
  "description" : "description"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Terminate an Existing Event Organizers by id
 * Admins put existing event organizers on the terminated users list
 *
 * body Body_15  (optional)
 * id_event_organizer String 
 * returns inline_response_200_14
 **/
exports.putEventOrganizersTerminateId_event_organizer = function(body,id_event_organizer) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "policy_breach" : "policy_breach",
  "id_admin" : 0,
  "description" : "description"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Suspend an Existing User by id
 * Admins can suspend a user for a specific amount of time as specified in policy.
 *
 * body Body_3 Details of user suspension  (optional)
 * id_user Integer 
 * returns inline_response_200_3
 **/
exports.putUsersSuspend = function(body,id_user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "suspensionLength" : "suspensionLength",
  "policy_breach" : "policy_breach",
  "id_admin" : 0,
  "description" : "description"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Terminate an Existing User by id
 * Admins put existing user on the terminated users list
 *
 * body Body_2  (optional)
 * id_user String 
 * returns inline_response_200_2
 **/
exports.putUsersTerminateId_user = function(body,id_user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "policy_breach" : "policy_breach",
  "id_admin" : "id_admin",
  "description" : "description"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

