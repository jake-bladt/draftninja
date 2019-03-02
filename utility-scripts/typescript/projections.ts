declare function require(name:string);
const fs = require('fs');

class ProjectionImporter {

    private _filePath: string;

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    private _parseLine(line: string) : string[] {
        return line.split('\t');
    }

    public importFromTsv() : boolean {
        fs.readFile(this._filePath, 'utf8', (err, contents) => {
            const lines: string[] = contents.split(/\r\n|\r|\n/);
            const headers: string[] = this._parseLine(lines[0]);

            lines.slice(1).forEach((line, index) => {
                if(index < 50) console.log(`Line #${index}: ${line}`);
            });
        });
        return false;
    }
}

let importer = new ProjectionImporter('../notes/custom-rankings-all.tsv');
importer.importFromTsv();
