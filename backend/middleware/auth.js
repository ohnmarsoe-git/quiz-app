import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const maxAge =  24 * 60 * 60;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const authHeaderToken = authHeader && authHeader.split(' ')[1]

  let token;

  if(authHeaderToken) {
    token = authHeaderToken;
  } else {
    token = req.cookies.token;
  }

  // const token = 
  //     req.cookies.token ||
  //     authHeaderToken ||
  //     req.body.token ||
  //     req.query.token ||
  //     req.headers['x-access-token']

  if(token == null ) return res.status(401).json('You are not Authenicated!')

  jwt.verify( token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).send({status: "fail", data:err.message});
    req.user = user
    // res.status(200).send({message:'Authorized User!'});
    return next()
  })
}

/**
 *  This function is used verify a google account
 */

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

const verfiyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    })
    return { payload: ticket.getPayload() }
  } catch (error) {
    return {error: "Invalid user detected. Please try again"}
  }
}


export {
  verifyToken,
  verfiyGoogleToken
}