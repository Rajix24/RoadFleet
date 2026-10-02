const user = require("../models/user.model")
const userService = require("../services/user.service")

class UserController {
    constructor() {
        this.UserService = userService;
        }

      getAll = async (req, res) => {
            try {
                const users = await this.UserService.getAllUsers();
                res.status(200).json(users);
            } catch (error) {
                res.status(400).json({message: `error in server in user controller ${error}`})
            }
        }
        getOneUser = async (req, res) => {
            try {
               const email = req.params.email;
               const user = await this.UserService.getOne(email)
                res.status(200).json({
                    message: true,
                    data: user
                });
            } catch (error) {
                res.status(400).json({message: `error in finding user  ${error}` })
            }
        }
        
        UpdateUser = async(req, res) => {
            const data = req.body
            const email = req.params.email
            const result = await this.UserService.updateUserInfo(email, data)
            console.log(result)
            res.status(200).json({message: "controller is wroking", 
                                    data: result})
        }   
        deleteUser = async (req, res) =>{
            const email = req.params.email;
            try{
                const  result = await this.UserService.deleteUser(email) 
                res.status(200).json({
                    message: "u has beed delete the user", 
                    result: result 
                })
            }catch(error){
                res.status(400).json({
                    message: "error in deleting user",
                    error: error
                })
            }
        }
}

module.exports = new UserController();