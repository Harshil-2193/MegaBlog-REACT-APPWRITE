import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite";


export class AuthService {
    client = new Client();
    acount;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);

        this.acount = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{    
            // Create account
            const userAccount = await this.acount.create(ID.unique(), email, password, name)
            
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
    async login({email,pass}){
        try{    
            return await this.account.createEmailSession(email, pass);
        }catch(err){
            throw(err);
        }
    }

    async getCurrentUser(){
        try{
            return await this.acount.get();
        }
        catch(err){
            throw err;
        }
        return null;
    }

    
    async logout(){
        try{    
            await this.acount.deleteSessions();
        }catch(err){
            throw(err);
        }
    }
}

const authService = new AuthService();

export default AuthService;