import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{    
            // Create account Service
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            
            // Login if the account is created using email and password.
            if(userAccount)
                return this.login({email,password})
            else
                return userAccount;       
        }catch(err){
            console.log("AppWrite Service :: createAccount :: Error",err);
        }
    }

    // Login Service
    async login({email,password}){
        try{    
            return await this.account.createEmailSession(email, password);
        }catch(err){
            console.log("AppWrite Service :: Login :: Error",err);
        }
    }

    // Get Current User Service
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(err){
            console.log("AppWrite Service :: getCurrentUser :: Error",err);
        }
    }

    // Logout Service
    async logout(){
        try{    
            await this.account.deleteSessions();
        }catch(err){
            console.log("AppWrite Service :: Logout :: Error",err);
        }
    }
}

const authService = new AuthService();

export default authService;