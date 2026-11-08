import jwt from 'jsonwebtoken';


export function generateToken(userId, res) {
  const token = jwt.sign(
    {
      userId
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );

  res.cookie(
    'jwt',
    token,
    {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      httpOnly: true, //Prevents xss attacks: cross-site scripting
      sameSite: 'strict', // prevents CSRF attacks
      secure: process.env.NODE_ENV = 'development' ? false : true
    }
  );

  return token;
};

//http://localhost
//https://chatapp.com