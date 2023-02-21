
const router = require("express").Router()

// TODO: build a /register Controllers
let userDB = []

router.post("/register", (req, res) => {
    let { name, email, password } = req.body
    try {
        userDB.push({ name, email, password })
        console.log(userDB)
        res.status(201).json({
            message: `User Created`,
        })

    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })

    }

})

// TODO : build a /login controller

router.post("/login", (req, res) => {
    console.log("okoko")

})

module.exports = router