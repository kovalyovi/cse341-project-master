// Prove04 controller

const Product = require("../../models/product.js");
const User = require("../../models/user.js");
const ProductModel = require("../../models/db/product.js");
const UserModel = require("../../models/db/user.js");

// handle prove04/
exports.getProducts = async (req, res, next) => {
  const products = await Product.getAll();
  const cartData = await ProductModel.find({});

  res.render("pages/prove04", {
    title: "Prove 04",
    path: "/prove04",
    products: products,
    cartItems: cartData,
  });
};

// handle prove04/product/:id
exports.getProduct = (req, res, next) => {
  const productIndex = req.params.productIndex;
  Product.fetchAll((products) => {
    res.render("pages/prove04/product", {
      title: "Prove 04",
      path: "/prove04/individual",
      product: products[productIndex],
    });
  }, "prove03");
};

// handle prove04/users
exports.getUsers = async (req, res, next) => {
  const users = await UserModel.find({});

  try {
    res.render("pages/prove04/users", {
      title: "Prove 04 Users",
      path: "/prove04-users",
      users: users,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// handle prove04/cart-items
exports.getCartItems = async (req, res, next) => {
  const products = await ProductModel.find({});

  try {
    res.render("pages/prove04/cart-items", {
      title: "Prove 04 Cart Items",
      path: "/prove04-cart-items",
      products,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// handle GET prove04/users/add
exports.getAddUsers = (req, res, next) => {
  res.render("pages/prove04/add", {
    title: "Prove 04",
    path: "/prove04/users/add",
  });
};

// handle POST prove04/users/add
exports.addUser = async (req, res, next) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    // res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  res.statusCode = 302;

  res.writeHead(302, { Location: "/prove04/users" });
  return res.end();
};

// handle POST prove04/cart/add
exports.addProductToCart = async (req, res, next) => {
  const product = new ProductModel({
    ...req.body,
    userId: -1, // to remove in the future
  });

  try {
    await product.save();
    // res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  res.statusCode = 302;

  res.writeHead(302, { Location: "/prove04" });
  return res.end();
};

// handle GET prove04/users/edit/:id
exports.editUser = async (req, res, next) => {
  const userId = req.params.id;
  const user = await UserModel.findById(userId);

  try {
    await user.save();
    res.render("pages/prove04/edit-user", {
      title: "Prove 04",
      path: "/prove04/edit",
      user: user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// handle POST prove04/users/update/
exports.updateUser = async (req, res, next) => {
  const query = { _id: req.body.userId };
  const { userId, ...updatedUser } = req.body;

  await UserModel.updateOne(query, updatedUser);

  res.statusCode = 302;

  res.writeHead(302, { Location: "/prove04/users" });
  return res.end();
};

// handle POST prove04/users/delete
exports.deleteUser = async (req, res, next) => {
  const query = { _id: req.body.userId };

  await UserModel.deleteOne(query);

  res.statusCode = 302;

  res.writeHead(302, { Location: "/prove04/users" });
  return res.end();
};

// handle POST prove04/cart-items/delete
exports.deleteFromCart = async (req, res, next) => {
  const query = { _id: req.body.productId };

  await ProductModel.deleteOne(query);

  res.statusCode = 302;

  res.writeHead(302, { Location: "/prove04/cart-items" });
  return res.end();
};

// handle prove04/search
exports.getSearchProducts = (req, res, next) => {
  const query = req.query.query.toLowerCase();
  Product.search(
    query,
    (filteredProducts) => {
      res.render("pages/prove04", {
        title: "Prove 04",
        path: "/prove04/search",
        products: filteredProducts,
      });
    },
    "prove03"
  );
};
