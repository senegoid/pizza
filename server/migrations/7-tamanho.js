'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "tamanho_id" from table "Tamanhos"
 * addColumn "tamanho_id" to table "Pizzas"
 *
 **/

var info = {
    "revision": 7,
    "name": "tamanho",
    "created": "2018-09-26T01:53:00.592Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Tamanhos", "tamanho_id"]
    },
    {
        fn: "addColumn",
        params: [
            "Pizzas",
            "tamanho_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Tamanhos",
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
