const express = require('express');
const DbConnection = require('../config/db');

const router = express.Router();


router.post('/', async (req, res) => {

    const { name, phonenumber, lessonID, noofspace } = req.body;


    let connection = await DbConnection.Get();
    var db = connection.db('vuecw2');
    await db.collection('order').insert({
        name,
        phonenumber,
        lessonID,
        noofspace
    },
        function (err, dbres) {
            if (err) throw err;
            res.send({ name, phonenumber, lessonID, noofspace })
        });
});


module.exports = router;