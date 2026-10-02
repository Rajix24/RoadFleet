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
        async getOneUser(req, res){
            try {

                console.log(req.body)
                return 
                const user = await this.UserService.getOne(req.body)
            } catch (error) {
                res.status(400).json({message: `error in finding user  ${error}` })
            }
        }

        async createUser(req, res){
            console.log(req)
        }
}

module.exports = new UserController();