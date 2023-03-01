# Getting Started 
<br>
- Create the `package.json` file
    - in the terminal you will use the command `npm init -y`

- install dependencies
    - `npm i express`
    - `npm i nodemon --save -dev
    - `npm i dotenv`

- create a `.gitignore` file
        - add `/node_modules`
        - add `.env`

- Create a `.env` file and update your env variables
- update `package.json` main to app.js
  - i.e. ` "main": "app.js"`
  - add `"dev": "nodemon"` to the file
<hr>




  ## Boiler Plate for Starting Server
<br>

  ```js 

    require("dotenv").config();
    const express = require("express");
    // const cors = require("cors");
    const app = express();

    const PORT = process.env.PORT || 4000;
    const HOST = process.env.HOST;

    app.listen(PORT, HOST, () => {
    console.log(`[server] running on ${HOST}: ${PORT}`);
    })

 ```
  ## Preparing our server to handle

    In the `app.js` file we need to add this line of code before our first
    route.

```js
app.use(express.json());
```

## CRUD (Create, READ, UPDATE, DELETE)
- Create : POST
- Read : GET
- Update: PUT or PATCH
- Delete : DELETE


## For Routing
For Creating a new route you will need to know the intended route and start in the `app.js` file

for example:
Route to be built: `http://127.0.0.1:4000/car/create`
`app.js` will handle the `http://127.0.0.1:4000/car` portion
`routes.js` will handle the `/create`

### Boiler Plate for Creating a NEW Controller

```js
const router = require("express").Router();


module.exports = router;
```

### Basic Controller file complete - Go to app.js and use the new controller

Add the following to the `app.js`

```js
const carController = require("./controllers/routes")

app.use("/car", carControllers);
```


NOTE: the `app.use("/car", carController);` needs to go after the `app.use(express.json());`

### Create the final endpoint (barebone) and test it out in Postman

#### Boiler Plate for Creating a New Route on the Controller

```js
router.post("/create", (req, res) => {
    try {
        res.json({message: "success from /create"});
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
});
```

## ID Generator uuid
- `npm install uuidv4`


# Schema Validation



### Mongoose

An ODM (Object data mapper)

- Provides a way for us to connect to our database
- Provides us with methods to CRUD our database
- Provides use with ways to model and shema our data

## Getting Started

- To install mongoose in our car-server:
- ``` npm i mongoose ```
- Import ``` mongoose ``` into our ``` app.js ``` file
- Import our mongo url from the .env file
- instantiate it with the following options:

```js
const mongoose = require("mongoose")
const DB_URL = process.env.DB_URL

mongoose
  .connect(DB_URL, {
    // Changes how it 
  })