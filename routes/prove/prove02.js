const express = require("express");
const fs = require("fs");
const router = express.Router();

const books = [
  {
    author: "Author 1",
    title: "Title 1",
    pageCount: 30,
  },
  {
    author: "Author 2",
    title: "Title 2",
    pageCount: 10,
  },
  {
    author: "Author 3",
    title: "Title 3",
    pageCount: 40,
  },
  {
    author: "Author 4",
    title: "Title 4",
    pageCount: 60,
  },
];

const redirectToHomepage = (res) => {
  res.statusCode = 302;

  res.writeHead(302, { Location: "/prove02" });
  return res.end();
};

router.get("/", (req, res, next) => {
  res.render("pages/prove02/", {
    title: "Prove 02 - Books",
    path: "/prove02",
    activeTA03: true,
    contentCSS: true,
    books: books,
  });
});

router.get("/addProduct", (req, res, next) => {
  res.render("pages/prove02/addProduct", {
    title: "Prove 02 - Add Product",
    path: "/prove02/addProduct",
    activeTA03: true,
    contentCSS: true,
    books: books,
  });
});

router.get("/books/delete/:id", (req, res) => {
  const bookToRemove = req.params.id;

  books.splice(bookToRemove, 1);
  console.log(`Deleted book ${books[bookToRemove]}`);

  return redirectToHomepage(res);
});

router.post("/books/add", (req, res, next) => {
  const book = req.body;

  if (book) {
    books.push(book);
    console.log(`Added book ${book}`);
  }

  return redirectToHomepage(res);
});

module.exports = router;
