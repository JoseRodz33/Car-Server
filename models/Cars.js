const mongoose = require("mongoose")

const Car = new mongoose.Schema(
    {
        make: {
            // Validators
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
        },
        vin: {
            type: String,
            required: true,
        },
        drivetrain: {
            type: String,
            required: true,
        },
        fuel: {
            type: String,
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
        engine: {
            type: String,
            required: true,
        },

    },
    // Creates createdAt and updatedAt timestamp
    { timestamps: true }
)

// Generate a collection by creating a MODEL

module.exports = mongoose.model("car", Car)