'use strict';


/**
 * Get Payment information by id
 * User fetch their payment information related to payment ID.
 *
 * id_payment String 
 * returns inline_response_200_10
 **/
exports.getPaymentsId_payment = function(id_payment) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "payment" : {
    "amount" : 6,
    "currency" : "currency",
    "id" : 0,
    "completed" : false,
    "id_reservation" : 1
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
 * Create Payment Intent
 * User creates Payment intent with payment provider
 *
 * body Body_11 Details of payment intent (optional)
 * returns inline_response_201_2
 **/
exports.postPayments = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "payment_intent" : {
    "amount" : 6,
    "currency" : "currency",
    "id" : 0,
    "completed" : false,
    "id_reservation" : 1
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

