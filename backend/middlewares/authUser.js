
import jwt from 'jsonwebtoken';
const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login again.' });
    }

    const token = authHeader.split(' ')[1]; // Get the token part

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ Set to req.userId instead of req.body.userId  

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
export default authUser;

