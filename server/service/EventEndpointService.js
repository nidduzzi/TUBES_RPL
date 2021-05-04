'use strict';


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
 * Query Events
 * Queries events that meets the query conditions
 *
 * q String query conditions JSON string (optional)
 * h String query format JSON string (optional)
 * returns inline_response_200_8
 **/
exports.getEvents = function(q,h) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "results" : [ {
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
 * Retrieve Details of an Event by id
 * Retrieves information and details of an event associated with the Event ID.
 *
 * id_event String 
 * returns inline_response_200_9
 **/
exports.getEventsId_event = function(id_event) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "event" : {
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
 * Get reservations for event by id
 * Event Organizers can fetch reservations that has been made for a specific event
 *
 * id_event String 
 * returns inline_response_200_7
 **/
exports.getEventsId_eventReservations = function(id_event) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
 * Create a New Event
 * Authorized Event Organizers create a new event.
 *
 * returns inline_response_201
 **/
exports.postEvents = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "event" : {
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
 * Update Event Details
 * Authorized Event Organizer updates the details of the event associated to the event ID.
 *
 * body Body_8 Details of revised event (optional)
 * id_event String 
 * returns inline_response_200_9
 **/
exports.putEventsId_event = function(body,id_event) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "event" : {
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
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

