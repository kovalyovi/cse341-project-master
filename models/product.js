// Product model

const fetch = require("node-fetch");
// const fs = require("fs");

const productsUrl = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
const prove03ProductsUrl = "https://raw.githubusercontent.com/kovalyovi/cse341-project-master/730411aecff8418e2911529ea4df28ab83aa5951/data/products.json";

const urlsToFetch = {
  ta03: productsUrl,
  prove03: prove03ProductsUrl,
};

module.exports = class Product {
  static fetchAll(cb, assignment) {
    fetch(urlsToFetch[assignment])
      .then((res) => res.json())
      .then((products) => {
        cb(products);
      })
      .catch((err) => console.log(err));
  }

  static search(query, cb, assignment) {
    fetch(urlsToFetch[assignment])
      .then((res) => res.json())
      .then((products) => {
        // search products
        const filteredProducts = products.filter((product) => {
          // search product tags
          let tagFound = false;
          product.tags.forEach((tag) => {
            if (tag.toLowerCase().includes(query)) tagFound = true;
          });

          return (
            tagFound || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
          );
        });

        cb(filteredProducts);
      })
      .catch((err) => console.log(err));
  }
};

// // Using local products.json file
// const path = require('path');
// const p = path.join(__dirname, '..', 'data', 'products.json');

// module.exports = class Product {
//     static fetchAll(cb) {

//         fs.readFile(p, (err, fileContent) => {
//             let products;
//             if (err) {
//                 products = [];
//             } else {
//                 products = JSON.parse(fileContent);
//             }
//             cb(products);
//         });
//     }

//     static search(query, cb) {
//         fs.readFile(p, (err, fileContent) => {
//             let products;
//             if (err)
//                 products = [];
//             else
//                 products = JSON.parse(fileContent);

//             // search products
//             const filteredProducts = products.filter(product => {
//                 // search product tags
//                 let tagFound = false;
//                 product.tags.forEach(tag => {
//                     if (tag.toLowerCase().includes(query))
//                         tagFound = true;
//                 });

//                 return tagFound ||
//                     product.name.toLowerCase().includes(query) ||
//                     product.description.toLowerCase().includes(query);
//             });

//             cb(filteredProducts);

//         });
//     }
// };
