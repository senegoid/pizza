'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "extra_id" from table "Pizzas"
 * createTable "PizzaExtras", deps: [Extras, Pizzas]
 *
 **/

var info = {
    "revision": 5,
    "name": "many",
    "created": "2018-09-26T00:37:26.079Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Pizzas", "extra_id"]
    },
    {
        fn: "createTable",
        params: [
            "PizzaExtras",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "ExtraId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Extras",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "PizzaId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Pizzas",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
