const redis = require("../redis/redis")
const User = require("../model/user");
class UserService {
    constructor() {
        this.redis = redis
        this.user = User
    }
    async registerNewUser(req) {
        var person = new this.user(req.body)
        try {
            var result = await person.save()
            const createdRedis = await this.redis.registerNewUser({ result, person })
            return createdRedis
        } catch (error) {
            throw error
        }

    }
    async deleteUser(req) {
        const { _id } = req.body
        try {
            await this.user.findByIdAndDelete(_id)
            const deletedUserFromRedis = await this.redis.deleteUser({ _id })
            return deletedUserFromRedis
        } catch (error) {
            throw error
        }

    }
    async fetchUser(req) {
        const { _id } = req.body
        try {
            const resultUser = await this.redis.fetchUser({ _id })
            return resultUser
        } catch (error) {
            throw error
        }

    }
    async fetchAllUser() {
        try {
            const allUser = await this.redis.fetchAllUser()
            return allUser
        } catch (error) {
            throw error
        }

    }
    async updateUser(req) {
        const { _id, name, surname, address } = req.body
        try {
            const filterUser = { _id: _id }
            const update = { name, surname, address }
            const updateUser = await this.user.findOneAndUpdate(filterUser, update)
            await this.redis.updateUser({ _id, name, surname, address })
            return updateUser
        } catch (error) {
            throw error
        }


    }


}
module.exports = UserService