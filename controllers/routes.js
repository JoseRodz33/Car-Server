const router = require("express").Router();
const Car = require("../models/Cars")

// Create an endpoint that has a POST method
// The full url for this endpoint is : http://127.0.0.1:4000/car/create


router.post("/create", async (req, res) => {
    try {
        const carIncoming = req.body

        const newCar = new Car(carIncoming)

        newCar.save()
        res.status(201).json({
            message: `User Created`,
            newCar
        })
    
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
});



router.get("/getall", async (req, res) => {
    try {
        const allCars = await Car.find()
        res.status(200).json(allCars)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
});

router.get("/getone/:id", async (req, res) => {
    try {
        const { id } = req.params
        const findItem = await Car.findById(id)

    
    
        
        
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        })
        
    }
})



router.delete("/delete/:id", async (req, res) => {

    try {
        const { id } = req.params
        const findItem = await Car.findByIdAndDelete(id)

        if (!findItem) {
            throw new Error(`Provided id: ${id} does not exist`)
        } else {
            res.status(200).json({
                message: `Car successfully deleted`,
                findItem
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});





// Create an endpoint that has a UPDATE method
// The full url for this endpoint is : http://127.0.0.1:4000/car/update/:id

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params
        const newCar = req.body

        const updatedItem = await Car.updateOne(
            { _id: id },
            { $set: newCar }
        )

    res.status(200).json({
        message: `Car successfully updated`,
        updatedItem
    })     
    } catch (error) {
    res.status(500).json({
        message: error.message,
    });
    }
});






module.exports = router;