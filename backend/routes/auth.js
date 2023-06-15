const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');




// create a user using: POST "/api/auth/createUser". Does not require auth  no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 8 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors, reurn bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    // check whether the user with the same email exists or not 

    try {


        let user = await User.findOne({ email: req.body.email });
        console.log('user')
        if (user) {
            return res.status(400).json({ error: "sorry, a user with this email already exists" })
        }

        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ user })
        // catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");

    }
})

module.exports = router