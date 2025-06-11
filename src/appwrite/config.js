import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post Service
    async createPost({title,slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, //ID.unique() will work too.
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        }catch(err){
            console.log("AppWrite Service :: createPost :: Error",err);
        }
    }

    // Update Post Service
    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        }catch(err){
            console.log("AppWrite Service :: updatePost :: Error",err);
        }
    }

    // Delete Post Service
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, 
            );
            return true;
        }catch(err){
            console.log("AppWrite Service :: deletePost :: Error",err);
            return false;
        }
    }

    // Get One Post Service
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, 
            );
        }catch(err){
            console.log("AppWrite Service :: getPost :: Error",err);
            return false;
        }
    }
    
    // Get All Posts with Active Status only
    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries, 
            );
        }catch(err){
            console.log("AppWrite Service :: getPosts :: Error",err);
            return false;
        }
    }

    // File Upload Service
    async uploadFile(file){
        try {

            await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (err) {
            console.log("AppWrite Service :: uploadFile :: Error",err)
            return false;
        }
    }

    //  Delete File Service
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            );
            return true;
        } catch (err) {
            console.log("AppWrite Service :: deleteFile :: Error",err)
            return false;
        }
    }

    // Preview File Service
    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            );  
            
        } catch (err) {
            console.log("AppWrite Service :: PreviewFile :: Error",err)
            return false;
        }
    }

}

const service = new Service();
export default service;

