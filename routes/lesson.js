const express = require('express');
const DbConnection = require('../config/db');
var ObjectId = require('mongodb').ObjectId;
const staticfile = require('../middlewares/staticfile')


const router = express.Router();


router.get('/', staticfile, async (req, res) => {
    let connection = await DbConnection.Get();
    var db = connection.db('vuecw2');
    await db.collection('lesson').find({}).toArray(function (err, result) {
        if (err) {
            return res.send(err).status(500)
        }
        else {
            return res.send(result)
        }
    });
});


router.put('/:id', async (req, res) => {

    let connection = await DbConnection.Get();
    var db = connection.db('vuecw2');
    await db.collection('lesson').findOne({ "_id": ObjectId(req.params.id) }, function (err, result) {
        if (err) {
            return res.send(err).status(500)
        }
        else {
            if (!result) {
                res.send("No course found with this id").status(404)
            }
            else {
                var myquery = { space: result.space };
                var newvalues = {
                    $set: { space: (result.space - 1) }
                };
                db.collection("lesson").updateOne(myquery, newvalues, function (err, dbres) {
                    if (err) {
                        return res.send(err).status(500)
                    }
                    else {
                        res.send({
                            ...result, space: result.space - 1
                        })
                    }
                });
            }
        }
    })
});




module.exports = router;