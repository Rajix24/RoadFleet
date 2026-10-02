const user = require("../models/user.model")


class UserRepository{
    async findAll() {
        try {
            const users = await user.find()
            return users;
        } catch (error) {
            console.log(error)
        }
    }

    async findById(email){
        return await user.findOne({email: email})
    }
    async create(data){
        try {
            const newUser = new user(req.body)
            const {email} = newUser

            const userExits = await user.findOne({email})

            if (userExits) {
                return res.status(400).json({message: "user all ready exist"})
            }
            const saveDate = await newUser.save()
            res.status(201).json(saveDate)
        } catch (error) {
            
        }
    }
    deleteById(id){
        return user.findByIdAndDelete(id)
    }
}


module.exports = new UserRepository();