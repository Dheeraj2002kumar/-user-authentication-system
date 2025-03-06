
---

# 🛡️ **User Authentication System**

This is a simple **User Authentication System** built using **JavaScript**, **OOP (Object-Oriented Programming)** principles, and libraries like **bcryptjs** for password hashing and **jsonwebtoken (JWT)** for token generation. The system supports user registration, login, and token-based authentication.

## ⚙️ **Features**

- 🔐 **User Registration**: Register a new user with a username and password.
- 🔑 **Password Hashing**: Passwords are securely hashed using **bcryptjs** before being stored in memory.
- ✅ **User Authentication**: Log in by verifying the username and password.
- 🪙 **JWT Token Generation**: Upon successful login, a **JWT token** is generated for secure access.
- 🔒 **Token Verification**: Validates the JWT token to ensure the user is authenticated.
- 💾 **In-memory Data Storage**: User data is stored temporarily in-memory.

## 📝 **How It Works**

This system consists of three core parts:

1. **User Class**:
   - Responsible for creating users and handling their password security.
   - Passwords are hashed using **bcryptjs** when a user is created.
   - It includes an `authenticate` method to verify user login credentials by comparing the password with the hashed one.

2. **AuthSystem Class**:
   - Manages user registration and login.
   - It uses the **User** class for user data management.
   - After a successful login, it generates a **JWT token** that can be used for future authentication.

3. **JWT (JSON Web Token)**:
   - Used for securely transmitting information between the client and server.
   - After successful login, a JWT token is generated with the user’s **username** and **secret key**.

---

## 🚀 **Setup & Installation**

### 1. **Clone the Repository**

First, clone the project to your local machine.

```bash
git clone https://github.com/Dheeraj2002kumar/-user-authentication-system.git
cd -user-authentication-system
```

### 2. **Install Dependencies**

Run the following command to install all required libraries:

```bash
npm install
```

### 3. **Run the Application**

After installing dependencies, you can run the project with the following command:

```bash
node authentication-system.js
```

This will run the authentication system, registering users, and attempting logins with different credentials.

---

## 🛠️ **Project Structure**

Here’s a brief overview of the file structure:

```
user-authentication-system/
│
├── authentication-system.js        # Main file that runs the authentication system
├── User.js                         # Defines the User class for password management & authentication
├── AuthSystem.js                   # Manages user registration, login, and token handling
├── package.json                    # Project metadata and dependencies
├── node_modules/                   # Folder containing all installed dependencies
└── README.md                       # Documentation of the project (this file)
```

---

## 🧑‍💻 **Code Walkthrough**

### **User Class (`User.js`)**
- This class is used to create a new user with a `username` and `password`.
- The password is hashed using **bcryptjs** before storing it.

```javascript
class User {
    constructor(username) {
        this.username = username;
        this.#passwordHash = null; // Initialize hash as null
    }

    // Hash the password
    async setPassword(password) {
        if (!password) {
            throw new Error("Password must be provided.");
        }
        this.#passwordHash = await bcrypt.hash(password, 10);
    }

    // Authenticate user by comparing provided password and stored hash
    async authenticate(password) {
        if (!this.#passwordHash) {
            throw new Error("Password hash is not set.");
        }
        return await bcrypt.compare(password, this.#passwordHash);
    }
}
```

### **AuthSystem Class (`AuthSystem.js`)**
- Manages the registration of users and their login credentials.
- Once logged in, a **JWT token** is generated using the **jsonwebtoken** library.

```javascript
class AuthSystem {
    constructor() {
        this.users = {}; // Store users in memory
        this.secretKey = "yourSecretKey"; // Key for signing JWT
    }

    async registerUser(username, password) {
        if (this.users[username]) {
            console.log(`User '${username}' already exists.`);
        } else {
            const newUser = new User(username);
            await newUser.setPassword(password);
            this.users[username] = newUser;
            console.log(`User '${username}' registered successfully.`);
        }
    }

    async loginUser(username, password) {
        const user = this.users[username];
        if (user) {
            const isAuthenticated = await user.authenticate(password);
            if (isAuthenticated) {
                const token = jwt.sign({ username: user.username }, this.secretKey, { expiresIn: '1h' });
                console.log(`Welcome, ${username}! JWT Token: ${token}`);
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

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return decoded;
        } catch (error) {
            console.log("Invalid or expired token.");
            return null;
        }
    }
}
```

---

## 📦 **Dependencies**

- **bcryptjs**: For password hashing and comparison.
- **jsonwebtoken**: For generating and verifying JWT tokens.

To install these dependencies, run:

```bash
npm install bcryptjs jsonwebtoken
```

---

## ⚡ **Future Improvements**

- 🌍 **Database Integration**: Store user data in a database (e.g., MongoDB, MySQL) instead of in-memory.
- 🔑 **Forgot Password Feature**: Implement a password reset functionality.
- 🛡️ **Enhanced Security**: Implement features like account lockouts after multiple failed login attempts.
- 📜 **User Roles**: Add different user roles (e.g., admin, regular user) with different access levels.

---

## 🖥️ **Contributing**

Feel free to fork the repository and contribute to it! If you encounter any issues or want to add new features, open a pull request.

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 💬 **Contact**

For any questions, feel free to reach out to [your-email@example.com](mailto:dk8549644@example.com).

---