const router = require("express").Router();
const fs = require("fs");
const dbPath = "./db/users.json";
const User = require("../models/User");
const Car = require("../models/Cars")

// TODO: build a /register Controllers
// let userDB = [{
//     name: 'Jose',
//     email: 'rodzjose33@gmail.com',
//     password: 'HolaPotato'
// }]

router.post("/register", async (req, res) => {
try {
    const { name, email, password } = req.body;

    // Checks if user entered all requiered values
    if ((!name, !email, !password)) {
    res.status(406).json({
        message: `Invalid Schema`,
    });
    throw new Error("The user has provided undefined Schema value");
    }

    // Instantiates a new model instance with provided object values
    const newUser = new User({ name, email, password });
    // saves the model document into the collection
    await newUser.save();

    res.status(201).json({
    message: `User Created`,
    newUser,
    });
} catch (err) {
    res.status(500).json({
    message: `${err}`,
    });
}
});

// TODO : build a /login controller

router.post("/login", async (req, res) => {
try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    console.log(foundUser);

    if (!foundUser) {
    res.status(404).json({
        message: `User not found`,
    });
    } else {
    foundUser.password == password
        ? res.status(200).json({
            message: `User logged in`,
            foundUser,
        })
        : res.status(403).json({
            message: `Invalid Password`,
        });
    }
} catch (err) {
    res.status(500).json({
    message: `${err}`,
    });
}
});

module.exports = router;
