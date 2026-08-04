import { Client, Databases, ID, Query } from "appwrite"
import config from "../conf/conf";

export class BlogServices {
    client = new Client()
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpointUrl)
            .setProject(config.projectId);
        this.databases = new Databases(this.client)
    }

    async createPost({ title, content, featuredImage, slug, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.tableId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.error("createPost error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.tableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.error("updatePost error", error)
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.tableId,
                slug,
            )
        } catch (error) {
            console.error("getPost error", error)
            return false
        }
    }

    async listPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.tableId,
                queries,
            )
        } catch (error) {
            console.error("listPost error", error)
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.tableId,
                slug,
            )
            return true
        } catch (error) {
            console.error("deletePost error", error)
            return false
        }
    }
}

const blogServices = new BlogServices()

export default blogServices