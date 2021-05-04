'use strict';


/**
 * Unverify Event Organizer
 * Remove event organizer from verified list by Admin
 *
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.deleteEventOrganizersVerifyId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Query Event Organizers
 * Retrieve all verified Event Organizers that match the query condition if any.
 *
 * q String query conditions JSON string (optional)
 * h String query format JSON string (optional)
 * returns inline_response_200_11
 **/
exports.getEventOrganizers = function(q,h) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "eventOrganizers" : [ {
    "profilePicture" : "",
    "address" : "address",
    "phone" : "phone",
    "authorizedUsersId" : [ 0, 0 ],
    "name" : "name",
    "verified" : true,
    "registrationDate" : "2000-01-23",
    "id" : 0,
    "email" : "",
    "verificationDate" : "2000-01-23"
  }, {
    "profilePicture" : "",
    "address" : "address",
    "phone" : "phone",
    "authorizedUsersId" : [ 0, 0 ],
    "name" : "name",
    "verified" : true,
    "registrationDate" : "2000-01-23",
    "id" : 0,
    "email" : "",
    "verificationDate" : "2000-01-23"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Details of an Event Organizer by id
 * Retrieve details of an Event Organizer associated to the Event Organizer ID.
 *
 * id_event_organizer Integer 
 * returns inline_response_200_12
 **/
exports.getEventOrganizersId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "event_organizer" : {
    "profilePicture" : "",
    "address" : "address",
    "phone" : "phone",
    "authorizedUsersId" : [ 0, 0 ],
    "name" : "name",
    "verified" : true,
    "registrationDate" : "2000-01-23",
    "id" : 0,
    "email" : "",
    "verificationDate" : "2000-01-23"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get events created by event organizer by id
 * Retrieve events created by the specified event organizer
 *
 * id_event_organizer String 
 * returns inline_response_200_16
 **/
exports.getEventOrganizersId_event_organizerEvents = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "events" : [ {
    "rsvp_deadline" : "rsvp_deadline",
    "unlimited_tickets" : true,
    "has_rsvp" : true,
    "ticket_types" : [ {
      "price" : 3,
      "name" : "name",
      "description" : "description",
      "attributes" : [ {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      }, {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      } ],
      "currency" : "currency",
      "id" : 7
    }, {
      "price" : 3,
      "name" : "name",
      "description" : "description",
      "attributes" : [ {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      }, {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      } ],
      "currency" : "currency",
      "id" : 7
    } ],
    "description" : "description",
    "tags" : [ {
      "name" : "name",
      "description" : "description",
      "id" : 5
    }, {
      "name" : "name",
      "description" : "description",
      "id" : 5
    } ],
    "max_tickets" : 5,
    "schedule" : [ {
      "start_time" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "end_time" : "2000-01-23T04:56:07.000+00:00",
      "all_day" : true,
      "description" : "description",
      "id" : 6,
      "place" : "place"
    }, {
      "start_time" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "end_time" : "2000-01-23T04:56:07.000+00:00",
      "all_day" : true,
      "description" : "description",
      "id" : 6,
      "place" : "place"
    } ],
    "public" : true,
    "reservations" : [ {
      "numTickets" : 5,
      "tickets" : [ {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      }, {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      } ],
      "price" : 2,
      "currency" : "currency",
      "id" : 0,
      "id_user" : 6,
      "confirmed" : true
    }, {
      "numTickets" : 5,
      "tickets" : [ {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      }, {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      } ],
      "price" : 2,
      "currency" : "currency",
      "id" : 0,
      "id_user" : 6,
      "confirmed" : true
    } ],
    "name" : "name",
    "reserved_tickets" : 2,
    "tagline" : "tagline",
    "id_event_organizer" : 1,
    "id" : 0
  }, {
    "rsvp_deadline" : "rsvp_deadline",
    "unlimited_tickets" : true,
    "has_rsvp" : true,
    "ticket_types" : [ {
      "price" : 3,
      "name" : "name",
      "description" : "description",
      "attributes" : [ {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      }, {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      } ],
      "currency" : "currency",
      "id" : 7
    }, {
      "price" : 3,
      "name" : "name",
      "description" : "description",
      "attributes" : [ {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      }, {
        "name" : "name",
        "id" : 9,
        "value" : "value"
      } ],
      "currency" : "currency",
      "id" : 7
    } ],
    "description" : "description",
    "tags" : [ {
      "name" : "name",
      "description" : "description",
      "id" : 5
    }, {
      "name" : "name",
      "description" : "description",
      "id" : 5
    } ],
    "max_tickets" : 5,
    "schedule" : [ {
      "start_time" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "end_time" : "2000-01-23T04:56:07.000+00:00",
      "all_day" : true,
      "description" : "description",
      "id" : 6,
      "place" : "place"
    }, {
      "start_time" : "2000-01-23T04:56:07.000+00:00",
      "name" : "name",
      "end_time" : "2000-01-23T04:56:07.000+00:00",
      "all_day" : true,
      "description" : "description",
      "id" : 6,
      "place" : "place"
    } ],
    "public" : true,
    "reservations" : [ {
      "numTickets" : 5,
      "tickets" : [ {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      }, {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      } ],
      "price" : 2,
      "currency" : "currency",
      "id" : 0,
      "id_user" : 6,
      "confirmed" : true
    }, {
      "numTickets" : 5,
      "tickets" : [ {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      }, {
        "nama" : "nama",
        "identificationNumber" : "identificationNumber",
        "id_ticket_type" : 5,
        "id" : 1,
        "indentificaitionType" : "KTP"
      } ],
      "price" : 2,
      "currency" : "currency",
      "id" : 0,
      "id_user" : 6,
      "confirmed" : true
    } ],
    "name" : "name",
    "reserved_tickets" : 2,
    "tagline" : "tagline",
    "id_event_organizer" : 1,
    "id" : 0
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
 * Update Event Organizer Details (add allowed users) by id
 * Update Event Organizer Details associated to the Event Organizer ID. Modify Event Organizer Profile. Add or remove allowed users.
 *
 * id_event_organizer Integer 
 * returns inline_response_200_13
 **/
exports.putEventOrganizersId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "event Organizer" : {
    "profilePicture" : "",
    "address" : "address",
    "phone" : "phone",
    "authorizedUsersId" : [ 0, 0 ],
    "name" : "name",
    "verified" : true,
    "registrationDate" : "2000-01-23",
    "id" : 0,
    "email" : "",
    "verificationDate" : "2000-01-23"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Verify Event Organizer by id
 * Put event organizer on verified list by Admin
 *
 * id_event_organizer String 
 * no response value expected for this operation
 **/
exports.putEventOrganizersVerifyId_event_organizer = function(id_event_organizer) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

