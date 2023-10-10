import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { errorResponse } from './response';
config()

export const authenticateToken = async(req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    errorResponse (res,401, 'Unauthorized');
  }

  verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      errorResponse(res,403, 'Forbidden');
    }

    req.user = user;
    next();
  });
};

