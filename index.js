const mysql = require("mysql"); 
const inquirer = require("inquirer")

// const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Cordoba@87",
  database: "great_bayDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

const createProduct = ()=>{
inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["POST AN ITEM", "BID ON AN ITEM"],
        name: "postOrBid"
    }
]
).then(function(res){
    if(res.postOrBid === "POST AN ITEM"){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the item?",
                name: "itemName"
            },
            {
                type: "input",
                message: "In what category is the item?",
                name: "itemType"
            },
            {
                type: "input",
                message: "What is your starting bid?",
                name: "startingBid"
            }
        ]).then((response)=>{
    
            addItem(response)          
          })
    }
    else if(res.postOrBid === "BID ON AN ITEM"){
        inquirer.prompt ([
            {
                type: "list",
                message: "please choose an item to bid on",
                name: "item",
                choices: [pullupItems()]
            }
        ])
    }
})



}
function addItem(response) {
              
    var query = connection.query(
      "INSERT INTO items SET ?",
      {
        itemName: `${response.itemName}`,
        itemType: `${response.itemType}`,
        startingBid: `${response.startingBid}`
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " item inserted!\n");
        // Call updateProduct AFTER the INSERT completes
      }
    );
  
   // logs the actual query being run
    console.log(query.sql);
  }

  function pullupItems() {
    connection.query("SELECT * FROM items", function(err, res) {
      if (err) throw err;
      return (res.itemName, res.itemType, res.starttingBid);          
    });
  } 
// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO items SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }