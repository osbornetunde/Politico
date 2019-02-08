import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const Helper = {

    //hash password
     hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },

    //compare password
    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword)
    },
    
    //validemail helper method
    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    },

     generateToken(id) {
        const token = jwt.sign({
            userId: id
        },
        process.env.SECRET, {expiresIn: '10d'}
        );
        return token;
    }
}

export default Helper;