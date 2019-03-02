declare function require(name:string);
const fs = require('fs');

class ProjectionImporter {

    private _filePath: string;

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    public importFromTsv() : boolean {
        fs.readFile(this._filePath, 'utf8', (err, contents) => {
            const lines: string[] = contents.split(/\r\n|\r|\n/);
            lines.forEach((line, index) => {
                console.log(`Line #${index}: ${line}`);
            });
        });
        return false;
    }
}

let importer = new ProjectionImporter('../notes/custom-rankings-all.tsv');
importer.importFromTsv();
