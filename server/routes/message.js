var db = require('../pg_db_adapter');
var express = require('express');
var cryptops = require('../calculate/crypto_ops');

module.exports = function (parentRouter) {
    var messagesRouter = express.Router();

    messagesRouter
        .get('/get', function (request, response) {
            cryptops.returnHash(request.query.password, function (res) {
                var params = [
                    request.query.id,
                    request.query.username,
                    res
                ];

                db.fetchItem('get', params, function (databasereturned) {
                    if (databasereturned.get != null) {
                        cryptops.returnDecryptedMessage(databasereturned.get, request.query.password, function (decryptedmessage) {
                            var jsonobject = databasereturned;
                            jsonobject.get = decryptedmessage;
                            response.json(jsonobject);
                        });
                    }
                    else
                        response.json(databasereturned);
                });
            });
        })

        .post('/post', function (request, response) {
            var body = request.body;
            cryptops.returnHash(body['password'], function (res) {
                cryptops.returnEncryptedMessage(body['message'], body['password'], function (encryptedoutput) {
                    var params = [
                        body['id'],
                        body['username'],
                        res,
                        encryptedoutput
                    ];

                    db.fetchItemAndReturn('post', params, response);
                });
            });
        });

    parentRouter.use('/messages', messagesRouter);
};
