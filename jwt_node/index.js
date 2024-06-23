const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const users = require('./user.json');
const datas = require('./data.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const SECRET_KEY = "enavenumnalumkudukaladey";

app.post('/login', (req, res) => {
    console.log('Request Body:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: "Bad request" });
    }

    const user = users.find((user) => user.username === username);

    if (user) {
        if (user.password === password) {
            const token = jwt.sign({ userId: user.id }, SECRET_KEY);
            return res.status(200).send({ token: token });
        } else {
            return res.status(401).send({ message: "Incorrect password" });
        }
    } else {
        return res.status(404).send({ message: "User not found" });
    }
});

function tokenverify(req, res, next) {
    const token = req.headers['authorization']; // Use 'authorization' header
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(401).send({ message: "Access denied" });
            } else {
                req.userId = authData.userId;
                next();
            }
        });
    } else {
        return res.status(401).send({ message: "Access denied" });
    }
}


app.get("/data", tokenverify, (req, res) => {
    console.log(req.userId);
    const userCars = datas.filter((car) => car.id === req.userId);
    res.status(200).send({ data: userCars });
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(8000, () => console.log("Server running on port 8000"));
