const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                res.status(403).json({
                    'status': 'err',
                    'message': 'Token Mismatched'
                })
            }
            req.payload = payload;
            next();

        });
    } else {
        res.status(403).json({
            'status': 'err',
            'message': 'Header Token Missing'
        })
    }
};

module.exports = auth;