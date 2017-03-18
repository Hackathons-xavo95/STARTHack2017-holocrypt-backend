var pgp      = require('pg-promise')({});
var database = pgp(process.env.DATABASE_URL);

function fetchDataAndReturn(func, params, response, isList) {
    database.func(func, params)
        .then(function (data) {
            response.json((isList) ? data : data[0]);
        })
        .catch(function (error) {
            response.status(400).send(error.message);
        });
}

function fetchData(func, params, isList, callback) {
    database.func(func, params)
        .then(function (data) {
            callback((isList) ? data : data[0]);
        })
        .catch(function (error) {
            callback("error");
        });
}

module.exports = {
    fetchListAndReturn: function (func, params, response) {
        fetchDataAndReturn(func, params, response, true);
    },
    fetchItemAndReturn: function (func, params, response) {
        fetchDataAndReturn(func, params, response, false);
    },
    fetchList: function (func, params, callback) {
        fetchData(func, params, true, callback);
    },
    fetchItem: function (func, params, callback) {
        fetchData(func, params, false, callback);
    }
};
