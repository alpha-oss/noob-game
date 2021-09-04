const express = require('express');

const app = express();

app.use('/src', express.static(__dirname + '/src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html', (err) = {
        if(err) {
            console.log(err);
            res.status(404).send(err);
        }
    });
});

app.listen(5000, () => {
    console.log("sever is running.");
});