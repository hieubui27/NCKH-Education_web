import jwt from 'jsonwebtoken';


export const authenticateToken = (req, res, next) => {
    try {
        // Lấy token từ Cookie hoặc Header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập" });
        }

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(403).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

export class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
