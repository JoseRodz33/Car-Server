
const router = require("express").Router()
const fs = require("fs");
const dbPath = "./db/users.json";




// TODO: build a /register Controllers
// let userDB = [{
//     name: 'Jose',
//     email: 'rodzjose33@gmail.com',
//     password: 'HolaPotato'
// }]

router.post("/register", (req, res) => {
    
    try {
        let { name, email, password } = req.body
        // TODO: grab a current snapshot of the database
        let userDB = read();

        // TODO: check if user exists 
        let userExistArray = userDB.filter( (user) => user.email === email);
        if (userExistArray.length > 0) {
            throw Error("Email already exist ")
        }

      // TODO: add the new user to the snapshot
    userDB.push({ name, email, password });

      // TODO: save the new snapshot to rewrite the file.
    const isSaved = save(userDB);
    console.log(userDB);
      // TODO: What if isSaved is false?
    res.status(201).json({
        message: isSaved === true ? `User created` : "We had a problem",
    });
    } catch (err) {
    res.status(500).json({
        message: `${err}`,
    });
    }
});

// TODO : build a /login controller

router.post("/login", (req, res) => {
    
    try {
        let {email, password} = req.body
        let userDB = read()
        // TODO: Check if user exists
        let userLogin = userDB.filter(user => user.email === email)
        // ! Checking to see if we have a user match
        if (userLogin.length === 0) {
            throw Error("user does not exist");
        // ! Password do not match
        } if (userLogin[0].password !== password) {
            throw Error("User Password does not match ")
        }

        // TODO: if the user doesn't exist then throw an error username doesn't exist

        // TODO: if they do exists then check to see if the passwords match

        // TODO: if they don't match then throw an error that the passwords do not match
        res.status(200).json({
            message: "login success"
        })

    } catch (err) {
        res.status(500).json({
            message: `${err}`,
        });
    }
    });



function read() {
    const file = fs.readFileSync(dbPath);
    // Converts a JSON object to object literal
    const fileObj = JSON.parse(file);
    return fileObj
}

function save(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err)
            return false
        }
    })
    return true
}


module.exports = router
