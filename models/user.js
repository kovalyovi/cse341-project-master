// User model

const fetch = require("node-fetch");

const usersUrl = "https://byui-cse.github.io/cse341-course/lesson03/items.json";

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
