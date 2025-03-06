const bcrypt = require('bcryptjs');

class User {
    constructor(username) {
        this.username = username;
        this.#passwordHash = null; // Initialize as null to indicate no password is set yet
    }

    // Private field for password hash
    #passwordHash;

    // Asynchronous method to set the password (hash it before storing)
    async setPassword(password) {
        // Check if password is already hashed or not
        if (!password) {
            throw new Error("Password must be provided.");
        }

        this.#passwordHash = await bcrypt.hash(password, 10);
    }

    // Authenticate by comparing the provided password with the stored hash
    async authenticate(password) {
        // Check if the password hash is set before attempting authentication
        if (!this.#passwordHash) {
            throw new Error("Password hash is not set.");
        }
        return await bcrypt.compare(password, this.#passwordHash);
    }
}

module.exports = User;
