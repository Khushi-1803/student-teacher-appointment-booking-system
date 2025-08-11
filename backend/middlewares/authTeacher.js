
import jwt from 'jsonwebtoken';  

//teacher authentication middleware
const authTeacher = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    const tToken = authHeader.split(' ')[1]; // Get the token part

    const decoded = jwt.verify(tToken, process.env.JWT_SECRET);

    req.teacherId = decoded.id; 

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
export default authTeacher;

