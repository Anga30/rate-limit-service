import jwt from 'jsonwebtoken';

function authenticateToken ( req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Access denied."})
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) return res.sendStatus(403);
        req.user = user
        next();
    });
}

export default authenticateToken;