const { registerNewUser, fetchUser, fetchAllUser } = require("../redis/redis");
const User = require("../model/user");
const UserService = require("../services/user")

module.exports = async (app) => {
    const userService = new UserService()
    app.post("/inseruser", async (req, res, next) => {
        try {
            const result = await userService.registerNewUser(req)
            res.json({ data: result, message: "user created" })
        } catch (error) {
            throw error;
        }
    })
    app.get("/getuser", async (req, res, next) => {
        try {
            const result = await userService.fetchUser(req)

            res.json({ data: result })
        } catch (error) {
            throw error;
        }
    })
    app.get("/getalluser", async (req, res, next) => {
        try {
            const result = await userService.fetchAllUser()
            res.json({ data: result })
        } catch (error) {
            throw error;
        }
    })
    app.post("/deleteuser", async (req, res, next) => {
        try {
            const deletedUser = await userService.deleteUser(req)
            res.json({ message: `${deletedUser} user deleted` })

        } catch (error) {
            throw error;
        }
    })
    app.put("/updateuser", async (req, res, next) => {
        try {
            const updatedUser = await userService.updateUser(req)
            res.json({ message: `${updatedUser._id.toString()} user updated` })

        } catch (error) {
            throw error;
        }
    })
}
