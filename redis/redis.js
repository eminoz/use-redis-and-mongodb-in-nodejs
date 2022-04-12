const redis = require("../database/redisConnection");
const UserModel = require("../model/RedisModel");

async function registerNewUser({ result, person }) {
  const userData = new UserModel(
    person.name,
    person.surname,
    person.address
  ).User();

  const userId = `User:${result._id.toString()}`;
  const user = await redis.hset(userId, userData);
  return user;
}

async function fetchUser({ _id }) {
  const userId = `User:${_id}`;
  const userIsExist = await redis.hexists(userId, "name");

  if (userIsExist) {
    const alluser = await redis.hgetall(userId);
    return alluser;
  } else {
    return false;
  }
}
async function deleteUser({ _id }) {
  const userId = `User:${_id}`;
  const deletedUser = await redis.hdel(userId, [
    "name",
    "surname",
    "address",
    "data",
  ]);
  return deletedUser;
}
async function fetchAllUser() {
  const fetchTheUsersFromRedis = async (user) => {
    const personList = [];
    for (var i = 0; i < user.length; i++) {
      const users = await redis.hgetall(user[i]);
      personList.push(users);
    }
    return personList;
  };

  const user = await redis.keys(`User*`);
  const result = await fetchTheUsersFromRedis(user);
  return result;
}
async function updateUser({ _id, name, surname, address }) {
  const userData = await new UserModel(name, surname, address).User();
  const userId = `User:${_id}`;

  const updatedUser = await redis.hset(userId, userData);
  return updatedUser;
}

module.exports = {
  registerNewUser,
  fetchUser,
  fetchAllUser,
  deleteUser,
  updateUser,
};
