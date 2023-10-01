import jwt from 'jsonwebtoken';

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

export {
  verifyToken
}