const express = require("express");

const router = express.Router();
const User = require("../models/user.model")

const formatErrors = require("../utils/validation")

const {body, validationResult} = require("express-validator");

router.post("/",

body("first_name").isLength({min : 3}).withMessage("Please enter a valid first name"),
body("last_name").isLength({min : 3}).withMessage("Please enter a valid last name"),
body("email").isEmail().withMessage("Please enter a valid Email address"),
body("pincode").isLength({min : 6, max : 6}).withMessage("Please enter a valid pincode"),
body("age").isInt({min : 1, max : 100}).withMessage("Please enter a valid age between 1 and 100"),
body("gender").isLength({min:4}).custom((gender)=>{
    if(gender == "Male" || gender == "Female" || gender == "Others"){
        return true;
    }else{
        return false;
    }
}).withMessage("Please enter a valid gender fron Male, Female, and Others")

,async(req, res)=>{

    try {

        let errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors : formatErrors(errors.array())});
        }

        const user = await User.create(req.body);
        return res.status(201).send(user);
        
    } catch (err) {

        return res.status(400).send(err.message)
        
    }
})

router.get("/", async(req, res)=>{

    try {
        
        const user = await User.find().lean().exec();

        res.status(200).send(user);

    } catch (err) {

        return res.status(400).send(err.message);
        
    }

})
module.exports = router;