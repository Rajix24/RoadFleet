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
            const user = await this.UserRepository.findByEmail(email)
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }
    updateUserInfo = async (req, res) =>{
        console.log(req.body)
        try {
            const result =  await this.UserRepository.updateUser()
            return result;
        } catch (error) {
            throw new Error(error)
        }
    } 
}

module.exports = new UserService();