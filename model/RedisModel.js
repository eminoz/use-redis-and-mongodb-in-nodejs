class UserModel {
    constructor(name, surname, address) {
        this.name = name,
            this.surname = surname,
            this.address = address
    }
    User() {
        const userData = {
            name: this.name,
            surname: this.surname,
            address: this.address,
        }
        return userData
    }
}

module.exports = UserModel