declare function require(name:string);
const fs = require('fs');

class Player {
    private _name: string;
    get name(): string { return this._name; }
    set name(val: string) { this._name = val; }
}

class ProjectionImporter {

    private _filePath: string;

    private _fieldMappings = {
        "Player": "name"
    }

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    private _parseLine(line: string) : string[] {
        return line.split('\t');
    }

    private _getPlayer(line: string, headers: string[]): Player {
        const ret: Player = new Player();
        const stats: string[] = this._parseLine(line);
        stats.forEach((stat, index) => {
            const statName: string = headers[index];
            if(statName in this._fieldMappings) {
                ret[this._fieldMappings[statName]] = stat;
            } else {
                ret[statName] = stat;
            }
        });

        return ret;
    }

    public importFromTsv() : boolean {
        fs.readFile(this._filePath, 'utf8', (err, contents) => {
            const lines: string[] = contents.split(/\r\n|\r|\n/);
            const headers: string[] = this._parseLine(lines[1]); // Two-line header. Disregard first line.

            const body: string[] = lines.slice(2);
            const players: Player[] = [];

            body.forEach((line) => {
                const player: Player = this._getPlayer(line, headers);
                console.log(player.name);
            });
        });
        return true;
    }
}

let importer = new ProjectionImporter('../notes/custom-rankings-all.tsv');
importer.importFromTsv();
