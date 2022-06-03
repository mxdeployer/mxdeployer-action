import * as azs from "@azure/storage-blob";
import path from 'path';

export default class ArtifactStore {

    constructor(connectionString) {
        this.connectionString = connectionString
    }

    async upload(appName, ref, artifactPath) {

        const baseName = path.basename(artifactPath);
        const refSuffix = ref.replace(/^refs\//, "");
        const blobName = path.join(appName, refSuffix, baseName);

        console.info(`Uploading ${artifactPath} --> "${blobName}" ...`);

        const serviceClient = azs.BlobServiceClient.fromConnectionString(this.connectionString);
        const containerClient = serviceClient.getContainerClient("artifacts");
        const blobClient = containerClient.getBlockBlobClient(blobName);

        await blobClient.uploadFile(artifactPath);

        console.info(`OK.`);

        return blobClient.url;
    }
}