var mysql = require("mysql");
var inquirer =require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"

});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name:"action",
            type: "list",
            message: "What is the ID of the product you would like to buy?",
            choices:["1","2","3","4"],

        }).then(function(ans){
            switch (ans.action) {
                case "1":
                    prod1();
                    break;
                case "2":
                    prod2();
                    break;
                case "4":
                    prod3();
                    break;
                case "4":
                   prod4();
                    break;
                case "5":
                connection.end();
                break;
            }
        })

};
function units(prod) {
    inquirer
    .prompt({
      name: "units",
      type: "input",
      message: "How many units of the product would you like to buy?"
    })
    .then(function(ans) {
      var query = "SELECT item_id, product_name, dept_name, price FROM products WHERE ?";
        // {
        //     artist:ans.artist
        // }
      connection.query(query, { stock_quantity: ans.units }, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].item_id + " || Song: " + res[i].product_name + " || Year: " + res[i].dept_name+ " || Year: " + res[i].price);
        }
        console.log("You are purchasing",ans.units,);
        
        runSearch();
      });
    });
};

function prod1() {
    console.log("prod");
    units();
};
function prod2() {
    console.log("prod")
};
function prod3() {
    console.log("prod")
};
function prod4() {
    console.log("prod")
};
