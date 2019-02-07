import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class Helper {

    //hash password
    static hashPassword(password) {
        return brcypt.hash(password, bcrypt.genSalt(10))
    }

    //compare password
    static comparePassword(hashPassword, password) {
        return bcrypt.compare(password, hashPassword)
    }
    
    //validemail helper method
    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    static generateToken(id) {
        const token = jwt.sign({
            userId: id
        },
        process.env.SECRET, {expiresIn: '10d'}
        );
        return token;
    }
}

export default Helper;