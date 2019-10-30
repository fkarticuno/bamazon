var mysql = require("mysql");
var inquirer =require("inquirer");
//  creates horizontal spacer for item organization
var spacer = "**===========================================================================**";
//  stores items as objects in an array
var items = [];
var prod;
var quant;
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    var query = "SELECT item_id, product_name, dept_name, price, stock_quantity FROM products";
    connection.query(query, {}, function(err, res) {
      if (err) throw err;
      console.log(spacer);
      for (var i = 0; i < res.length; i++) {

        console.log("ID:",res[i].item_id + 
            " || Name:",res[i].product_name + 
            " || Department:", res[i].dept_name + 
            " || Price:", res[i].price +
            " || Quantity:",res[i].stock_quantity);
        items[i+1] = [
            id = res[i].item_id ,
            item = res[i].product_name,
            dept = res[i].dept_name,
            cost = res[i].price,
            qty = res[i].stock_quantity
        ]
        };
        console.log(spacer);
        //console.log(items) // testing
      runSearch(res);
    });
});
function runSearch(res) {
    inquirer
        .prompt([
            {
            name:"action",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
            },
            {
            name: "units",
            type: "input",
            message: "How many units of the product would you like to buy?"
            }
        ])
        .then(function(ans){
            prod = parseInt(ans.action);
            quant = parseInt(ans.units);
//            console.log(ans); // testing
            console.log(spacer);
            console.log("selected",ans.units) //testing 
            if (ans.units<= items[ans.action][4]){
                inquirer
                .prompt([
                    {
                        name: "checkout",
                        type:"confirm",
                        message: "You are buying "+ans.units+" "+
                        items[ans.action][1]+"(s) "+
                        "for $"+(ans.units * items[ans.action][3])+ 
                        "\n"+
                        "Press ENTER for yes or press any key for no" ,
                        default: true
                    }
                ]).then(function(ans){
                    //console.log(ans.checkout) //testing
                    if (ans.checkout) {
                        console.log("Here are your items!");
                        console.log("prod:",items[prod][0],"quant:",quant);
                        query =connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                        [quant,items[prod][0]],
                        function(err, res){
                            if (err) throw err;
                        })
                        connection.end();
                    }
                    else {
                        console.log("OK, please make another selection.");
                        runSearch();
                    }
                })
            console.log();
            }
            else{
                console.log("Sorry we only have",items[ans.action][4],"in stock")
                runSearch();
            }
            })
        
        
};
