import bcrypt from 'bcryptjs';


export const hashPassword = async (password) => {
    if (!password || password.trim().length < 5) {
        throw new Error('Password too short!');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}