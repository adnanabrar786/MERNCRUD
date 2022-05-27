const express = require('express');
const app = express()

const mongoose = require('mongoose')

const cors = require("cors");

// database schema
const FoodModel = require("./modals/Food")



// use middleware always needed for frontend React
app.use(express.json())
app.use(cors())

// mongoose atlas connection
mongoose.connect(
    "mongodb+srv://newuser:adnan1245abrar@crud.wadt6.mongodb.net/food?retryWrites=true&w=majority"
    , {
        useNewUrlParser: true
    }
).then(() => {
    console.log("Atlas Database Connected");
})
    .catch(() => {
        console.log(err);
    })


// read all the Database 
app.get("/read", async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
            console.log(err);
        } else {
            res.send(result)
            console.log(result);
        }
    })
})

// create or insert data
app.post("/insert", async (req, res) => {

    const foodName = req.body.foodName
    const days = req.body.days

    try {
        const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });
        const result = await food.save();
        console.log(result);
    } catch (err) {
        console.log(err);
        res.send("Error")
    }

})



    // update all records in Database 
app.put("/update", async (req, res) => {

    const newFoodName = req.body.newFoodName
    const id = req.body.id

    try {
        await FoodModel.findById(id, (err, updateFood) => {
            updateFood.foodName = newFoodName;
            updateFood.save();
            res.send("updated");
        })

    } catch (err) {
        console.log(err);
    }

})


    // delete the records in Database 

app.delete("/delete/:id", async (req, res) => {

    const id = req.params.id

    await FoodModel.findByIdAndRemove(id).exec();

    res.send("deleted")

})


// server port
app.listen(5000, () => {
    console.log('server is running');
})