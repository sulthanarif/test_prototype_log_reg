'use strict'

// import users
import Users from '../model/users.js';

// import bcrypt
import bcrypt from 'bcrypt';

// import jwt
import jwt from 'jsonwebtoken';

// get all users
export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: [ 'id', 'name', 'email' ]
        });
        res.status(200).json({message:"get users   ", users});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// register user
export const Register = async (req, res) => {
    const { name, email, password, confPass } = req.body;
    if (password !== confPass) {
        return res.status(400).json({ message: "Passwords don't match" });
    }

    const salt = await bcrypt.genSalt();
    
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
         await Users.create({ 
            name: name, 
            email: email, 
            password: hashedPassword });
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



// login user
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {

        // check if user exists
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // create token
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        

        // create refresh token
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET ,{expiresIn: '1d' });
        
        
        await Users.update({'refresh_Token': refreshToken}, { where: { id: user.id } });

        // create cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true,
        maxAge: 24*60*60*1000 });
        
        res.json({ token ,message: "Logged in successfully" });




    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
