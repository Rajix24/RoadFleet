const userRepository = require("../repository/user.repository")

class UserService{
    constructor(){
        this.UserRepository = userRepository
    }
    async getAllUsers(){
        try {
            const users =  await this.UserRepository.findAll()
            return users;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOne(email) {
        try {
            const users = await this.userRepository.findOne(email)
            return users;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = new UserService();