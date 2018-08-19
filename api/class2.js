const express = require("express");
const router = express.Router();

const filename = "database/database.sqlite";
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(filename);
// db.run("PRAGMA foreign_keys = ON");

router.get("/customers", function(req, res) {
  var sql = "select * from customers";
  // var sql2 = " select * from customers where first_name in()";
  // var sql3 = "select * from customers where first_name = 'Colm'";

  // select * from customers where surname in ("O'Connor", 'Trump')
  // Write a query to get all of the customers with the first name "Colm" or "Hillary" using IN.

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

router.get("/customers/id/:id", function(req, res) {
  // var sql = "select * from customers where id = " + req.params.id;
  var sql = `select * from customers where id = ${req.params.id}`;

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

// router.get("/customers/:id", function(req, res) {
//   // TODO: add code here
// });

router.get("/customers/surname/:surname", function(req, res) {
  var sql = `select * from customers where surname like '%${
    req.params.surname
  }%'`;
  db.all(sql, [], (err, row) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", row);
    res.status(200).json({
      customers: row
    });
  });
});

//like '%lint%';

router.post("/customers/", function(req, res) {
  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }
  // TODO: add code here
  const data = req.body;
 var dataCa = { title: '${data.title}', firstName: '${data.firstname}', lastName: '${data.surname}', email: '${data.email}' };
 const sql = `insert into customers (title, first_name, surname, email) values ('${data.title}', '${data.firstname}', '${data.surname}', '${data.email}')`;
  db.all(sql, [], (err, row) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", data);
    res.status(200).json({
      customers: data
    });
  });
});

router.put("/customers/:id", function(req, res) {
  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }
  // TODO: add code here
  const data2 = req.body;
  const sql = `update customers set title = '${data2.title}', first_name = '${
    data2.firstname
  }', surname = '${data2.surname}' where id ='${req.params.id}'`;
  db.all(sql, [], (err, row) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", data2);
    res.status(200).json({
      customers: data2
    });
  });
});

// get '/reservations'
// TODO: add code here
router.delete("/reservations/:id", function(req, res) {
  const data3 = req.body;
  const sql = `delete from reservations where id =${req.params.id}`;
  db.run(sql);
  return res.status(200).send();
});


// Homework2:
// User Story: As a staff member, I want to create a new reservation

router.post("/reservations/", function(req, res) {
  
  const data = req.body;
  var dataCa = {
    id: "${data.id}",
    customer_id: "${data.customer_id}",
    room_id: "${data.room_id}",
    check_in_date: "${data.check_in_date}",
    check_out_date: "${data.check_out_date}",    
    room_price: "${data.room_price}"  };
  const sql = `insert into reservations (id, customer_id, room_id, check_in_date, check_out_date, room_price) values ('${data.id}', '${data.customer_id}', '${data.room_id}', '${data.check_in_date}', '${data.check_out_date}', '${data.room_price}')`;
  db.all(sql, [], (err, row) => {
    if (err) {
      console.log("ERROR fetching from the database:", err);
      return;
    }
    console.log("Request succeeded, new data fetched", data);
    res.status(200).json({
      customers: data
    });
  });
});

// Homework3
//User Story: As a staff member, I want to get a list of all the existing reservations.
router.get("/reservations", function(req, res) {
  var sql = "select * from reservations";
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




//HOMEWORK 4
//User Story: As a customer, I want to check the details of a reservation.
router.get("/reservations/:id", function(req, res) {
  var sql = `select * from reservations where id = ${req.params.id}`;

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


//HOMEWORK 5
//User Story: As a staff member, I want to get a list of all the reservations that start at a given date.
//Create and end-point to get from /reservations/starting-on/:startDate all the reservations that start at a given date.
router.get("/reservations/starting-on/:startDate", function(req, res) {
  let { startDate } = req.params;
  var sql = `select * from reservations where check_in_date = ${startDate}`;

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

// //HOMEWORK 6
// User Story: As a staff member, i want to get a list of all the reservations that are active at a given date.
// Create and end-point to get from /reservations/active-on/:date

router.get("/reservations/active-on/:date", function(req, res) {
  let {date} = req.params;
  var sql = `select * from reservations where check_in_date <= ${date} and (check_out_date > ${date} or check_out_date is null)`;

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
