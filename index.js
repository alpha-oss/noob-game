const express = require('express');

const app = express();
const PORT = 5000;

app.use('/src', express.static(__dirname + '/src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html', (err) = {
        if(err) {
            console.log(err);
            res.status(404).send(err);
        }
    });
});

app.listen(PORT, () => {
    console.log(`sever is running on port http://localhost:${PORT}`);
});