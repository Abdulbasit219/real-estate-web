import bcrypt from 'bcrypt';

export const hashpassword = async (pass) => {
    try {
        const hashedpassword = await bcrypt.hash(pass,10);
        return hashedpassword;
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (pass, hashpass) => {
    try {
        return bcrypt.compare(pass, hashpass)
    } catch (error) {
        console.log(error)
    }
} 