import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export default class UserController {
    constructor() {
        // No need for userRepository since we're using model directly
    }

    async signIn(req, res) {
      try {
          const { email, password } = req.body;

          console.log("email", email);

          // Validate required fields
          if (!email || !password) {
              return res.status(400).json({
                  status: 'error',
                  message: 'Email and password are required'
              });
          }

          // Find user by email
          const user = await UserModel.findByEmail(email);

          console.log("user", user);
          
          if (!user) {
              return res.status(401).json({
                  status: 'error',
                  message: 'Invalid credentials'
              });
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          if (!isPasswordValid) {
              return res.status(401).json({
                  status: 'error',
                  message: 'Invalid credentials'
              });
          }

          // Generate JWT token
          const token = jwt.sign(
              { 
                  userId: user.id,
                  email: user.email,
                  type: user.type 
              },
              process.env.JWT_SECRET,
              { expiresIn: '24h' }
          );

          // Remove password from response
          const { password: _, ...userWithoutPassword } = user;

          return res.status(200).json({
              status: 'success',
              message: 'Sign in successful',
              data: {
                  user: userWithoutPassword,
                  token
              }
          });

      } catch (error) {
          console.error('Sign in error:', error);
          return res.status(error.status || 500).json({
              status: 'error',
              message: error.message || 'Error during sign in'
          });
      }
  }

    async signUp(req, res) {
        try {
            const { name, email, password, type } = req.body;

            // Validate required fields
            if (!name || !email || !password || !type) {
                return res.status(400).json({ 
                    status: 'error',
                    message: 'All fields are required' 
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create new user instance
            const userModel = new UserModel(
                name,
                email,
                hashedPassword,
                type.toUpperCase()
            );

            // Call the save method on the instance
            const savedUser = await userModel.save();

            // Remove password from response
            const { password: _, ...userWithoutPassword } = savedUser;

            return res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: userWithoutPassword
            });

        } catch (error) {
            console.error('Signup error:', error);
            return res.status(error.status || 500).json({
                status: 'error',
                message: error.message || 'Error creating user'
            });
        }
    }

    async getAllUsers(req, res) {
      try {
          // Call the static getAll method from UserModel
          const users = await UserModel.getAll();

          // Remove passwords from response
          const usersWithoutPasswords = users.map(user => {
              const { password, ...userWithoutPassword } = user;
              return userWithoutPassword;
          });

          return res.status(200).json({
              status: 'success',
              message: 'Users retrieved successfully',
              data: usersWithoutPasswords
          });

      } catch (error) {
          console.error('Get all users error:', error);
          return res.status(error.status || 500).json({
              status: 'error',
              message: error.message || 'Error retrieving users'
          });
      }
  }
}