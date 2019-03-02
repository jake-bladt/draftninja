declare function require(name:string);
const fs = require('./fs');

class ProjectionImporter {

    private _filePath: string;

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    public importFromTsv() : boolean {

        return false;
    }
}

let importer = new ProjectionImporter('../notes/custom-rankings.all.tsv');
