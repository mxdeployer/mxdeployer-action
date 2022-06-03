export default class ArtifactStore {

    constructor(connectionString) {
        this.connectionString = connectionString
    }

    async upload(path) {
        console.debug(`Uploading ${path} ...`);
        return "#";
    }
}