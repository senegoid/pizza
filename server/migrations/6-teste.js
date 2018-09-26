'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "tamanho_id" from table "Pizzas"
 * addColumn "tamanho_id" to table "Tamanhos"
 *
 **/

var info = {
    "revision": 6,
    "name": "teste",
    "created": "2018-09-26T01:50:16.142Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Pizzas", "tamanho_id"]
    },
    {
        fn: "addColumn",
        params: [
            "Tamanhos",
            "tamanho_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Pizzas",
                    "key": "id"
                },
                "allowNull": true
            }
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
