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
        "Player": "name",
        "SV-BS": "nsv"
    }

    private _fieldConversions = {
        "Pos": val => val.split("/")
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
            const statVal = statName in this._fieldConversions ? this._fieldConversions[statName](stat) : stat;

            if(statName in this._fieldMappings) {
                ret[this._fieldMappings[statName]] = statVal;
            } else {
                ret[statName.toLowerCase()] = statVal;
            }
        });

        return ret;
    }

    public importFromTsv() : boolean {
        fs.readFile(this._filePath, 'utf8', (err, contents) => {
            const lines: string[] = contents.split(/\r\n|\r|\n/);
            const headers: string[] = this._parseLine(lines[1]); // Two-line header. Disregard first line.

            const body: string[] = lines.slice(2);
            const players: Player[] = body.map(line => this._getPlayer(line, headers));
            const source: string = `const playerUniverse = ${JSON.stringify(players, null, 2)};`;
            fs.writeFile('../site/stats.js', source, (err) => console.log(err));

        });
        return true;
    }
}

let importer = new ProjectionImporter('../notes/custom-rankings-all.tsv');
importer.importFromTsv();
