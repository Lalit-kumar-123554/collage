import prisma from '../config/postgreSQL.js'
import ApplicationError from "../error-handler/ApplicationError.js"

export default class UserModel {
    constructor(name, email, password, type) {
        this.name = name
        this.email = email
        this.password = password
        this.type = type
    }

    static async getAll() {
        try {
            const users = await prisma.user.findMany()
            return users
        } catch (error) {
            throw new ApplicationError("Error fetching users", 500)
        }
    }

    async save() {
        try {
            const user = await prisma.user.create({
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    type: this.type
                }
            })
            return user
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ApplicationError("Email already exists", 400)
            }
            throw new ApplicationError("Error creating user", 500)
        }
    }

    static async findByEmail(email) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            return user
        } catch (error) {
            throw new ApplicationError("Error finding user", 500)
        }
    }
}