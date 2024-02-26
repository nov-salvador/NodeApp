import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

//Register a user
export async function register(req, res){
  try{
    const {firstname, lastname, email, password, picturePath, friends, location, occupation, bio} = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstname, 
      lastname, 
      email, 
      password: passwordHash, 
      picturePath, 
      friends, 
      location, 
      occupation, 
      bio,
      viewedProfile: Math.floor(Math.random() * 100000),
      impressions: Math.floor(Math.random() * 100000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(err){
    res.status(500).json({error: err.message})
  }
};

//Log in a user
export async function login(req, res){
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
      return res.status(400).json({message: "User does not exist"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: "Invalid password"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({token, user})
  }catch(err){
    res.status(500).json({error: err.message})
  }
}