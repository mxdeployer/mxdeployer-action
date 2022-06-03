import * as azs from "@azure/storage-blob";
import path from 'path';

export default class ArtifactStore {

    constructor(connectionString) {
        this.connectionString = connectionString
    }

    async upload(artifactPath) {

        const blobName = path.basename(artifactPath);
        console.info(`Uploading ${artifactPath} ...`);

        const serviceClient = azs.BlobServiceClient.fromConnectionString(this.connectionString);
        const containerClient = serviceClient.getContainerClient("artifacts");
        const blobClient = containerClient.getBlockBlobClient(blobName);

        await blobClient.uploadFile(artifactPath);

        console.info(`OK.`);

        return blobClient.url;
    }
}