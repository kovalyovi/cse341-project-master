const express = require("express");
const fs = require("fs");
const router = express.Router();

const users = ["First", "Second", "Third", "Fourth"];
const newUsers = [];

router.get("/", (req, res, next) => {
  res.write(`
  <html>
    <head><title>Ponder 01!</Title></head>
    <body>
      <h1>Welcome to my Prove 01!</h1>
      <a href="/">Home</a></br>
      <form action="./create-user" method="POST">
        <input type="text" name="username">
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>
  `);
  return res.end();
});

router.post("/create-user", (req, res, next) => {
  console.log(req.body);

  newUsers.push(req.body.username);

  res.statusCode = 302;
  res.writeHead(302, { Location: "users" });
  return res.end();
});

router.get("/users", (req, res, next) => {
  res.write(`
  <html>
    <head><title>Ponder 01!</Title></head>
    <body>
      <h1>Here are the users:</h1>
      <ul>
        ${users.map((user) => `<li>${user}</li>`).join("")}
        ${newUsers.map((user) => `<li>${user} (new)</li>`).join("")}
      </ul>
    </body>
  </html>
  `);
  return res.end();
});

module.exports = router;
