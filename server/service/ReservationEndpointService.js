'use strict';


/**
 * Remove a Reservation Cancelation by id
 * Admins remove reservation from cancelation list
 *
 * id_reservation String 
 * no response value expected for this operation
 **/
exports.deleteReservationsCancelId_reservation = function(id_reservation) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Remove a Reservation Confirmation by id
 * Admins can remove a reservation from the confirmed list
 *
 * id_reservation String 
 * no response value expected for this operation
 **/
exports.deleteReservationsConfirmId_reservation = function(id_reservation) {
  return new Promise(function(resolve, reject) {
    resolve();
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
 * Get Reservation Details by id
 * Users or Event Organizers retrieve the information of the reservation with the matching reservation ID.
 *
 * id_reservation String 
 * returns inline_response_201_1
 **/
exports.getReservationsId_reservation = function(id_reservation) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reservation" : {
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
 * Get a list of user's reservations by id
 * A user can retrieve the reservations that they have made
 *
 * id_user String 
 * returns inline_response_200_7
 **/
exports.getUsersId_userReservations = function(id_user) {
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
 * Create new reservation
 * Users create new reservation
 *
 * body Body_9  (optional)
 * returns inline_response_201_1
 **/
exports.postReservations = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reservation" : {
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
 * Cancel a Reservation by id
 * Users cancel a reservation
 *
 * id_reservation String 
 * no response value expected for this operation
 **/
exports.putReservationsCancelId_reservation = function(id_reservation) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Confirm a Reservation by id
 * Confirm a reservation
 *
 * body Body_10  (optional)
 * id_reservation String 
 * returns inline_response_201_1
 **/
exports.putReservationsConfirmId_reservation = function(body,id_reservation) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "reservation" : {
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
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

