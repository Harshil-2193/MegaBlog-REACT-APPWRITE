import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  //  Create account and auto-login
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return null;
      }
    } catch (err) {
      console.error("AppWrite Service :: createAccount :: Error", err.message);
      throw err; 
    }
  }

  //  Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      console.error("AppWrite Service :: Login :: Error", err.message);
      throw err;
    }
  }

  // Get currently logged in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.warn("AppWrite Service :: getCurrentUser :: Error", err.message);
      return null; 
    }
  }

  //  Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      console.error("AppWrite Service :: Logout :: Error", err.message);
      throw err;
    }
  }
}

const authService = new AuthService();
export default authService;
