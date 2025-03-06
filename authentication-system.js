const AuthSystem = require('./AuthSystem');

(async () => {
    const authSystem = new AuthSystem();

    // Register users
    await authSystem.registerUser("john_doe", "password123");
    await authSystem.registerUser("jane_smith", "securePass");

    // Attempt to login with correct credentials
    const token = await authSystem.loginUser("john_doe", "password123");  // Should succeed

    // Try with incorrect login credentials
    await authSystem.loginUser("john_doe", "password123");  // Should fail

    // Test JWT token verification
    if (token) {
        const decoded = authSystem.verifyToken(token);
        if (decoded) {
            console.log("Token is valid:", decoded);
            console.log()
        }
    }

    // Test with an invalid token
    const invalidToken = "invalid.jwt.token";
    authSystem.verifyToken(invalidToken);  // Should fail
})();
