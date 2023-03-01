const router = require("express").Router();
const fs = require("fs");
// Create an endpoint that has a POST method
// The full url for this endpoint is : http://127.0.0.1:4000/car/create
const dbPath = "./db/cars.json";
const { v4: uuid_v4 } = require('uuid');

router.post("/create", (req, res) => {
    try {
    // generates an ID for us
        const id = uuid_v4()
    // reads the current cars JSON file
        let cars = read()
    // destructuring the body in the request
        const {make, model, mileage, color} = req.body
    // packaging up the cars object to be inserted
        const data = {id, make, model, mileage, color}
    // appending our data to the array before saving
        cars.push(data)

        const isSaved = save(cars)

        if (!isSaved) {
            throw Error("car not saved")
        }

        res.json({message: "success from /create"});
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
});

function read() {
    const file = fs.readFileSync(dbPath);
    // Converts a JSON object to object literal
    const fileObj = JSON.parse(file);
    return fileObj
};

function save(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err)
            return false
        }
    })
    return true
};

router.get("/getall", (req, res) => {
    try {
        const cars = read()
        res.json({cars, message: "success from /getall"});
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
});

router.get("/getone/", (req, res) => {
    try {
        let id = req.query.id
        let foundCar = findById(id)

        foundCar.length == 0
        ? res.status(404).json({
            message: `No Car has been found`
        })
        : res.status(200).json({
            foundCar
        })
        
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        })
        
    }
})



router.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
        // TODO: See if Id exists
        const carFound = findById(id)
        const isCarFound = carFound.length > 0 ? true : false;

    if (!isCarFound) {
        throw Error("car not found")
    }

    // TODO: Remove the car
    const cars = read();
    const filteredCars = cars.filter(car => car.id !== id)

    // TODOD: save the filtered cars

    save(filteredCars);

        res.json({message: "success from /delete", recordDeleted: carFound[0] });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});





// Create an endpoint that has a UPDATE method
// The full url for this endpoint is : http://127.0.0.1:4000/car/update/:id

router.put("/update/:id", (req, res) => {
    try {
        const id = req.params.id
        const carFound = findById(id)
        const isCarFound = carFound.length > 0 ? true : false;

        if (!isCarFound) {
            throw Error("car not found");
        }

        let cars = read();
        let carIndex = cars.findIndex(car => car.id === id)

        const make = req.body.make
        const model = req.body.model
        const mileage = req.body.mileage
        const color = req.body.color

        cars[carIndex].make = make ?? cars[carIndex].make;
        cars[carIndex].model = model ?? cars[carIndex].model
        cars[carIndex].mileage = mileage ?? cars[carIndex].mileage;
        cars[carIndex].color = color ?? cars[carIndex].color

        save(cars)




    res.json({ message: "success from /update" });


    } catch (error) {
    res.status(500).json({
        message: error.message,
    });
    }
});




function findById(id) {
    const cars = read();
    const filteredCars = cars.filter(car => car.id === id)
    return filteredCars

}

module.exports = router;