import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60;

const signToken = ( id ) => {
  return jwt.sign( { id }, process.env.ACCESSS_TOKEN_SECRET, { expiresIn: "10s" });
}

const generateRefreshToken = (id) => {
  return jwt.sign( { id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "24h" });
}

export {
  signToken,
  generateRefreshToken
}