const User = require("../models/user.model")


class UserRepository{
    async findAll() {
        try {
            const users = await User.find()
            return users;
        } catch (error) {
            console.log(error)
        }
    }
    async findByEmail(email){
        const user =  await User.findOne({email: email})
        return user;
    }
    async updateUser(email, data) {
        console.log(email)
        console.log(data)
        return 
        // return await User.findOneAndUpdate(
        //     { email: email },
        //     { $set: data },
        //     { new: true, runValidators: true }
        // );
    }
    deleteById(id){
        return User.findByIdAndDelete(id)
    }
}


module.exports = new UserRepository();