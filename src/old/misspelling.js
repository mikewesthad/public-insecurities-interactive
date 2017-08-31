export const TYPO_TYPES = {
    CAPS_LOCK: "caps_lock",
    INSERTED_CHAR: "inserted_char",
    SKIPPED_CHAR: "skipped_char"  
};

function manhattanDistance({x1, y1}, {x2, y2}) {
    return 
}

class Qwerty {
    constructor() {
        const keyGrid = [
            ["`~", "1!", "2@", "3#", "4$", "5%", "6^", "7&", "8*", "9(", "0)", "-_", "=+"],
            ["qQ", "wW", "eE", "rR", "tT", "yY", "uU", "iI", "oO", "pP", "[{", "]}", "\\|"],
            ["aA", "sS", "dD", "fF", "gG", "hH", "jJ", "kK", "lL", ";:", "'\""],
            ["zZ", "xX", "cC", "vV", "bB", "nN", "mM", ",<", ".>", "/?"]
        ];
        this.keyCoordinates = {};
        let off = 0;
        for (const [y, keyRow] of keyGrid.entries()) {
            for (const [x, keys] of keyRow.entries()) {
                this.keyCoordinates[keys[0]] = {x: x + off, y};
                this.keyCoordinates[keys[1]] = {x: x + off, y};
            }
            if (y === 0) off += 1.75;
            else off += 0.25;
        }
    }

    doesKeyExist(key) {
        return this.keyCoordinates[key] !== undefined; 
    }

    getDistance(key1, key2) {
        if (!this.doesKeyExist(key1) || !this.doesKeyExist(key2)) return null;
        const pos1 = this.keyCoordinates[key1];
        const pos2 = this.keyCoordinates[key2];
        return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + (Math.pow(pos2.y - pos1.y, 2)));
    }
}

const qwerty = new Qwerty();
console.log(qwerty.keyCoordinates["`"]);
console.log(qwerty.keyCoordinates["1"]);
console.log(qwerty.keyCoordinates["q"]);
console.log(qwerty.keyCoordinates["a"]);
console.log(qwerty.keyCoordinates["z"]);
console.log(qwerty.getDistance("a", "A"));
console.log(qwerty.getDistance("a", "S"));
console.log(qwerty.getDistance("c", "f"));
console.log(qwerty.getDistance("c", "v"));
console.log(qwerty.getDistance("c", "b"));


function keyDistance(char1, char2) {
}

function generateTypo(word, typoType) {

}