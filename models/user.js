// User model

const fetch = require("node-fetch");

const usersUrl = "https://raw.githubusercontent.com/kovalyovi/cse341-project-master/master/data/users.json";

module.exports = class User {
  static fetchAll(cb) {
    fetch(usersUrl)
      .then((res) => res.json())
      .then((users) => {
        cb(users);
      })
      .catch((err) => console.log(err));
  }
};
