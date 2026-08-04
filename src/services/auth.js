import { Client, Account, ID } from "appwrite";
import config from "../conf/conf";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpointUrl)
            .setProject(config.projectId);
        this.account = new Account(this.client)
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.logIn({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            console.error("Not able to create an account", error)
        }
    }

    async logIn({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("Log In failed", error)
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            return null
        }

        return null
    }

    async logOut(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.error("Log Out failed", error)
        }
    }
}

const authSevice = new AuthService()

export default authSevice