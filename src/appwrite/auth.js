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
            // Create account
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            
            // Login if the account is created using email and password.
            if(userAccount)
                return this.login({email,password})
            else
                return userAccount;       
        }catch(err){
            throw err;
        }
    }

    // Login Method
    async login({email,password}){
        try{    
            return await this.account.createEmailSession(email, password);
        }catch(err){
            throw(err);
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(err){
            throw err;
        }
    }

    
    async logout(){
        try{    
            await this.account.deleteSessions();
        }catch(err){
            throw(err);
        }
    }
}

const authService = new AuthService();

export default authService;