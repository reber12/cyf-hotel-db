const express = require('express');
const sqlite3 = require( 'sqlite3' ).verbose();

const filename = 'database/database.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();

// get '/reservations-and-invoices/'
// TODO: add code here

router.delete('/reservations/:id/', function(req, res) {
  const id = req.params.id;
  const sql = 'delete from reservations where id = ' + id;

  db.run(sql, (err, rows) => {
    res.status(200).json({
      customers: rows
    });
  });
});
// Exercise 4.b: OPTIONAL STRETCH GOAL
// Select the latest 5 reservations on the database.
//select * from reservations order by check_in_date desc limit 5;



// Exercise 4.c: OPTIONAL STRETCH GOAL
// Select the reservations, primarily selecting the most recent ones, and secondarily selecting the longest ones.
// select * from reservations order by check_in_date desc, check_out_date Asc;



// EXERCISE 5.a
// Get the list of check in dates in the summer 2017.
// select * from reservations where check_in_date > '2018/06/01' and check_in_date < '2018/09/01';


// EXERCISE 6.a
// COUNT the number of reservations for a given customer ID
// select count(*) from reservations where customer_id = 3;


// EXERCISE 6.b: OPTIONAL STRETCH GOAL
// Calculate the average paid amount across all invoices.
// select avg(total) from invoices;

// EXERCISE 7.a
// COUNT the occurrences of the DIFFERENT titles on the database.
// SELECT title, COUNT(*) FROM customers group by title;

// EXERCISE 8.a
// Get the list of customers that have 5 or more reservations on our hotel.
// SELECT surname, COUNT(*) AS count FROM customers GROUP BY surname HAVING count >= 5;

// SELECT surname, COUNT(*) AS count FROM customers GROUP BY surname HAVING surname = 'Dove';

// SELECT customers.first_name, customers.surname, reservations.customer_id, 
// COUNT(*) AS count FROM customers join reservations where customers.id = reservations.id  GROUP BY customer_id;


// HOMEWORK 1
// User Story: As a staff member, I want to see reservations and their respective invoices

router.get("/reservations-and-invoices", function(req, res) {
  var sql =
    "select reservations.id, invoices.*  from reservations join invoices where reservations.id = invoices.reservation_id;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});



//HOMEWORK 2
// Calculate the total amount paid on invoices for the summer of 2017.
router.get("/total-paid-summer2017", function(req, res) {
  var sql = "SELECT SUM(total) FROM invoices where invoices.invoice_date_time between 30/06/2017 and 30/08/2017 and paid = 1;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});

//HomeWork3
// User Story: As a staff member, I want to check the number reservations for each customer, 
// including their own details, so that we check who are our best customers.
router.get("/best-customers", function(req, res) {
  var sql = "select customers.*, COUNT(*) AS number_of_reservations from customers join reservations on customers.id = reservations.customer_id group by customers.id order by surname;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});

// Homework4
// Get the number of reservations for each room ID and include the details for the room details

router.get("/numOfResrvationsForRoomID", function(req, res) {
  var sql = "select rooms.*, COUNT(*) AS number_of_reservations from rooms join reservations on rooms.id = reservations.room_id group by reservations.room_id order by id;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});



// HOMEWORK 5
// Adapt the previous query (8.c) to include the details for the type of room.

router.get("/numOfResrvationsForRoomIdWithRoomTypes", function(req, res) {
  var sql = "select rooms.*, COUNT(*) AS number_of_reservations from rooms join reservations on rooms.id = reservations.room_id group by reservations.room_id order by id;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});


// HOMEWORK 6
// Get the list of rooms with sea view that were reserved more than 5 times

router.get("/numOfResrvationsForRoomIdWithRoomTypes", function(req, res) {
  var sql = "select rooms.*, COUNT(*) AS number_of_reservations from rooms join reservations on rooms.id = reservations.room_id group by reservations.room_id having sea_view =1 and  number_of_reservations > 5  order by id;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});

// HOMEWORK 8
// User Story As a staff member, I want to get the list of reservations within a time period, including the room and customer details


router.get("/reservations/details-between/:from_day/:to_day", function(req,res) {
  var sql = `select reservations.*, rooms.*, customers.* from reservations join rooms, customers on reservations.customer_id = customers.id and reservations.room_id = rooms.id where check_in_date between ${req.params.from_day} and ${req.params.to_day};`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});



// HOMEWORK 9
// User Story As a staff member, I want to get the number of reservations per customer.
router.get("/reservations-per-customer", function(req, res) {
  var sql = "select customers.*, COUNT(*) AS number_of_reservations from customers join reservations on customers.id = reservations.customer_id group by customers.id order by surname;";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});

// HOMEWORK 10
// User Story As a staff member I want to analyse the rentability of each room, getting the total amount 
// earned for each room, the average per reservations, and the number of reservations it has had in the past.
router.get("/stats-price-room", function(req, res) {
  var sql =
    "select reservations.room_id, sum(total) as Earned_form_this_room, avg(total) as Average_per_res, count(*) as Number_of_reservations from reservations join invoices on reservations.id = invoices.reservation_id group by reservations.room_id; ";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});


// HOMEWORK 11
// User Story As a client or staff member, I want to check the availability of a room within
// a given date range.

router.get("/rooms/available-in/:from_day/:to_day", function(req, res) {
  var sql = `select rooms.*, room_types.type_name from rooms join room_types on rooms.room_type_id = room_types.id where rooms.id not in (select room_id from reservations where (${
    req.params.from_day
  } not between check_in_date and check_out_date and ${
    req.params.to_day
  } not between check_in_date and check_out_date));`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", rows);
    res.status(200).json({
      customers: rows
    });
  });
});






module.exports = router;
