const jwt = require('jsonwebtoken');
const User = require('./User');

class AuthSystem {
    constructor() {
        this.users = {};  // In-memory storage for users
        this.secretKey = "yourSecretKey";  // Secret key for signing JWT tokens
    }

    // Register a new user
    async registerUser(username, password) {
        if (this.users[username]) {
            console.log(`User '${username}' already exists.`);
        } else {
            const newUser = new User(username);
            await newUser.setPassword(password);  // Wait for password to be hashed
            this.users[username] = newUser;  // Save the user after setting the password
            console.log(`User '${username}' registered successfully.`);
        }
    }

    // Login a user and generate JWT token
    async loginUser(username, password) {
        const user = this.users[username];
        if (user) {
            const isAuthenticated = await user.authenticate(password);
            if (isAuthenticated) {
                const token = jwt.sign({ username: user.username }, this.secretKey, { expiresIn: '1h' });

                console.log(`\nWelcome, ${username}! JWT Token: ${token}`);
                return token;
            } else {
                console.log("Invalid username or password.");
                return null;
            }
        } else {
            console.log("User not found.");
            return null;
        }
    }

    // Verify JWT token
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            console.log()
            return decoded;
        } catch (error) {
            console.log("Invalid or expired token.");
            return null;
        }
    }
}

module.exports = AuthSystem;
