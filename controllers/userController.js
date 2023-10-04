const Booking = require("../models/Booking.js")
const User = require("../models/User.js")
const bcrypt = require ("bcryptjs")
const { getBookingById } = require("./bookinController.js")

exports.getAllUsers = async (req, res, next) => {
    let users
    try {
        users = await User.findOne({email: req.body.email})

    }catch(err) {
        return console.log(err)
    }
    if(!users){
        return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(200).json({users})
}

exports.signup = async(req, res, next) => {
    const {name, email, password} = req.body
    if(!name && 
        name.trim() === "" && 
        !email && 
        email.trim() === "" && 
        !password && 
        password.trim() === ""
        ){
            return res.status(422).json({message: "Invalid Inputs"})
        }

    const hashedPassword = bcrypt.hashSync(password)

        let user
        try{
            user = new User({name,email,password: hashedPassword})
            user = await user.save()
        }catch(err){
            return console.log(err)
        }
        if(!user){
            return res.status(500).json({message: "Unexpected Error Occured"})
        }
        
        return res.status(201).json({user})
}

exports.updateUser = async(req, res, next) => {
    const id = req.params.id
    const {name, email, password} = req.body
    if(!name && 
        name.trim() === "" && 
        !email && 
        email.trim() === "" && 
        !password && 
        password.trim() === ""
        ){
            return res.status(422).json({message: "Invalid Inputs"})
        }

        const hashedPassword = bcrypt.hashSync(password)

        let user 
        try {
            user = await User.findByIdAndUpdate(id, {name, email, password: hashedPassword})
        }catch(err){
            return console.log(err);
        }
        if(!user){
            return res.status(500).json({message: "Something went wrong"})
        }
        res.status(200).json({message: "Updated Successfully"})
}

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id
    let user
    try{
        user = await User.findByIdAndRemove(id)
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message: "Something went wrong"})
    }
    return res.status(200).json({message: "Delete Successfully"})
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body
    if( !email && 
        email.trim() === "" && 
        !password && 
        password.trim() === ""
        ){
            return res.status(422).json({message: "Invalid Inputs"})
        }

    let existingUser
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err) 
    }
    if(!existingUser){
        return res.status(404).json({message: "Unable to find the user from this ID"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Password Incorrect"})
    }

    return res.status(200).json({message:"Login Successfull" })

}



exports.getUserById = async (req, res, next) =>{
    const id = req.params.id
    let user
    try{
        user=await User.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!user){
        return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(200).json({user})
}

exports.getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookingsId;
    try {
      bookingsId = await Booking.find({ user: id })
        .populate("Movie")
        .populate("User");
      User.findOneAndUpdate({_id: bookingsId}, {$push: {bookings: bookingsId._id}} ).exec()
      await bookingsId.save()
    } catch (err) {
      return console.log(err);
    }
    if (!bookingsId) {
      return res.status(500).json({ message: "Unable to get Bookings" });
    }
    return res.status(200).json({ bookingsId });
  };