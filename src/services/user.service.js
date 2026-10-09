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
    updateUserInfo = async (email, data) =>{
        try {
            const result =  await this.UserRepository.updateUser(email, data)
            return result;
        } catch (error) {
            throw new Error(error)
        }
    } 
    deleteUser = async (email) => {
        try {
            const result = await this.UserRepository.deleteByEmail(email)
            return result;
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }
    async available(){
        try {
            const result = await this.UserRepository.available()
            return result;
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }
}

module.exports = new UserService();