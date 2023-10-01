import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { User } from '../models/User.js';
import { signToken, generateRefreshToken } from '../utils/generateToken.js';
import { handleErrors } from '../utils/handleErrors.js';


const maxAge =  24 * 60 * 60;

const refreshToken = (req, res) => {

  const token = req.cookies.token || req.body.token
  // const authHeader = req.headers['authorization']
  //const token = authHeader && authHeader.split(' ')[1]

  // send error if there is no token or invalid
  if(token === null) return res.status(401).json({message:'You are not authenicated!'})

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    
    if(err) return res.status(403).json({message: err.message});
   
    const newAccessToken = signToken( user );
    const newrefreshToken = generateRefreshToken( user );

    res.cookie('token', newrefreshToken, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newrefreshToken
    })
  })
}

const login = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login( email, password );

    const accessToken = signToken( user.email );
    const refreshToken = generateRefreshToken( user.email );
    
    // refreshTokens.push(accessToken);
    res.cookie('token', refreshToken, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ 
      email: user.email,
      role: user.role, 
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  
  } catch (err) { 
    const errors = handleErrors(err)
    res.status(400).json({ errors: errors });
  }
}

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email,  password, role});
    res.status(200).send(user);
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json(errors);
  }
}

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json("Logout successfully");
}

export {
  login,
  register,
  refreshToken,
  logout
}