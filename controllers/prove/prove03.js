// Prove03 controller

const Product = require("../../models/product.js");
const User = require("../../models/user.js");

// handle prove03/
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("pages/prove03", {
      title: "Prove 03",
      path: "/prove03",
      products: products,
    });
  }, "prove03");
};

// handle prove03/product/:id
exports.getProduct = (req, res, next) => {
  const productIndex = req.params.productIndex;
  Product.fetchAll((products) => {
    res.render("pages/prove03/product", {
      title: "Prove 03",
      path: "/prove03/individual",
      product: products[productIndex],
    });
  }, "prove03");
};

// handle prove03/
exports.getUsers = (req, res, next) => {
  User.fetchAll((users) => {
    res.render("pages/prove03/users", {
      title: "Prove 03 Users",
      path: "/prove03-users",
      users: users,
    });
  });
};

// handle prove03/search
exports.getSearchProducts = (req, res, next) => {
  const query = req.query.query.toLowerCase();
  Product.search(
    query,
    (filteredProducts) => {
      res.render("pages/prove03", {
        title: "Prove 03",
        path: "/prove03/search",
        products: filteredProducts,
      });
    },
    "prove03"
  );
};
