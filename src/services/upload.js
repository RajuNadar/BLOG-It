import { Client, Storage, ID } from "appwrite";
import config from "../conf/conf";
// console.log("configgg", config);

export class UploadServices {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpointUrl)
            .setProject(config.projectId);
        this.storage = new Storage(this.client)
    }

    async uploadFile(file) {
        if (!file) {
            return null;
        } else {
            try {
                return await this.storage.createFile(
                    config.bucketId,
                    ID.unique(),
                    file,
                )
            } catch (error) {
                console.error("uploadFile", error)
                return false;
            }
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.bucketId,
                fileId,
            )
            return 200
        } catch (error) {
            console.error("deleteFile error", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFileView(
            config.bucketId,
            fileId,
        )
    }
}

const uploadServices = new UploadServices()

export default uploadServices