const express = require('express');

const app = express();
const PORT = 5000;

// route
const lb = require('./backend/lb'); 
app.use('/lb', lb);

app.use('/game', express.static(__dirname + '/game'));

// MAIN GAME
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