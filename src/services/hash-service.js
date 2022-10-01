const bcrypt = require('bcryptjs');

class HashService {
    hashPassword(password) {
        const hash = bcrypt.hashSync(password, 10)
        return hash;
    };

    verifyPassword(password, hashedPassword) {
        const matchPass = bcrypt.compareSync(password, hashedPassword);
        return matchPass;
    };


    hashOtp(otpNumber) {
        const hash = bcrypt.hashSync(otpNumber, 10)
        return hash;
    };

    verifyOtp(otp, hashedOtp) {
        const matchPass = bcrypt.compareSync(otp, hashedOtp);
        return matchPass;
    };


}

module.exports = HashService;