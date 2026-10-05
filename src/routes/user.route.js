const express =  require("express")
const route = express.Router()
const UserController = require("../controllers/user.controller")
const auth_middleware = require("../middlewares/auth_middleware")
const {validate} = require("../middlewares/validation.middleware")
const  roleMiddleware  = require("../middlewares/role.middleware")
// const {register_validator} = require("../validators/user.validator")



/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a list of users
 *     description: Retrieve all users. Only administrators can access this endpoint.
 *     responses:
 *       200:
 *         description: A list of users.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User is not authorized.
 */
route.get("/users",auth_middleware, roleMiddleware("chauffeur"), UserController.getAll)

/**
 * @swagger
 * /api/user/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a user by email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email address of the user
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: User found successfully.
 *       401:
 *         description: User is not authenticated.
 *       404:
 *         description: User not found.
 */
route.get("/user/:email",auth_middleware, UserController.getOneUser)



/**
 * @swagger
 * /api/user/{email}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email address of the user
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       401:
 *         description: User is not authenticated.
 *       404:
 *         description: User not found.
 */
route.put("/user/:email", auth_middleware,  UserController.UpdateUser)


/**
 * @swagger
 * /api/user/{email}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email address of the user
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: User is not authenticated.
 *       403:
 *         description: User is not authorized.
 *       404:
 *         description: User not found.
 */


route.delete("/user/:email", auth_middleware, roleMiddleware("admin"), UserController.deleteUser)

module.exports = route

