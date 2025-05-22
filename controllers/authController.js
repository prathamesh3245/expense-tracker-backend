const { User } = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")


const saltRounds = 10;

const generateToken = (payload) => {

    const secretkey = 'yourSecretkey';
    
    const token = jwt.sign(payload, secretkey, {expiresIn: '1h'});
    return token
};

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password)
}

const register = async(req, res) => {

    const emailExists = await User.findOne({
        email: req.body.email
    })

    if(emailExists){
        return res.status(400).json({success: true, message: "Email already in use"});
    }
    
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    

    const hashed = hashPassword(password)

    
    await User.create({
        name: name,
        email: email,
        password: hashed
    })


    return res.status(201).json({success: true, message: "User Registered Successfully!"});
}

const login = async(req, res) => {


    const password = req.body.password

    const user = await User.findOne({
       email: req.body.email
    })

    if(!user){
        return res.status(404).json({message: "User not found!"})
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {

        if(err){
            return res.status(500).json({success: false, message: "Internal Error"});
        }

        if(!isMatch){
            res.status(401).json({success: false, message: "Incorrect password!"});
        }

        else{
            const token = generateToken({id: user._id});
            res.json({success: true, token, user: {name: user.name, email: user.email}})
        }
        
    })
}


module.exports = { register, login}

