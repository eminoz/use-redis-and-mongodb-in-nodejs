const redis = require("../redis/redis");
const User = require("../model/user");
class UserService {
  constructor() {
    this.redis = redis;
    this.user = User;
  }
  async registerNewUser(req) {
    var person = new this.user(req.body);

    try {
      var result = await person.save();

      const createdRedis = await this.redis.registerNewUser({ result, person });
      return createdRedis;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(req) {
    const { _id } = req.body;
    try {
      await this.user.findByIdAndDelete(_id);
      const deletedUserFromRedis = await this.redis.deleteUser({ _id });
      return deletedUserFromRedis;
    } catch (error) {
      throw error;
    }
  }
  async fetchUser(req) {
    const { _id } = req.body;
    try {
      const resultUser = await this.redis.fetchUser({ _id });
      if (resultUser) {
        return resultUser;
      } else {
        const resultUser = await this.user.findById(_id);
        var message = "returned from mongodb";
        const result = { message, resultUser };

        return result;
      }
    } catch (error) {
      throw error;
    }
  }
  async fetchAllUser() {
    try {
      // const allUser = await this.user.find()

      const allUser = await this.redis.fetchAllUser();
      if (allUser.length !== 0) {
        return allUser;
      } else {
        const result = await this.user.find();
        const fetchUserFromMongoDB = result.map((user) => ({
          name: user.name,
          surname: user.surname,
          address: user.address,
        }));

        return fetchUserFromMongoDB;
      }
    } catch (error) {
      throw error;
    }
  }
  async updateUser(req) {
    const { _id, name, surname, address } = req.body;
    try {
      const filterUser = { _id: _id };
      const update = { name, surname, address };
      const updateUser = await this.user.findOneAndUpdate(filterUser, update);
      await this.redis.updateUser({ _id, name, surname, address });
      return updateUser;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserService;
