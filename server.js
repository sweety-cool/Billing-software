const express = require('express');
const DB = require('./database');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));

// app.all('/', (req, res) => {
//     res.send(`BILLING SOFTWARE`);
// })
app.all('/api/item/list', async (req, res) => {
    res.json(await DB.query(`SELECT * FROM items;`));
});

app.all('/api/item/add', async (req, res) => {
    if (req.body.rate && req.body.itemName) {
        const sql = `INSERT INTO items (item_name,rate) VALUES ('${req.body.itemName}', '${req.body.rate}');`
        await DB.query(sql);
        res.send(`ADDED SUCCESFULLY`);

    } else res.send(`INVALID DATA`);

});




app.all('/api/items/get', async (req, res) => {
    if (req.body.id) {
        res.json(await DB.query(`SELECT * FROM items WHERE id='${req.body.id}';`));
    } else res.send(`INVALID DATA`);
});

app.listen(port);


