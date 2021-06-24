const MongoClient = require('mongodb').MongoClient;

const user = 'lucat';
const password = '123QWEasdzxc';

// const uri = `mongodb+srv://${user}:${password}@cluster0.41o89.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const uri = "mongodb://127.0.0.1:27017/"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const database = 'project1';
const collection_db = 'users';

async function connection(client) {
    client.connect(err => {
        if (err) throw err;

        const collection = client.db(database).collection(collection_db);

        const items = collection.find({}).toArray();
        items.then((result) => {
            // console.log("result: ", result);
        })

        // collection.insertOne({ name: 'PC', location: 'home' },
        //     function(err, doc) {
        //         if (err) { console.log("errore insert: ", err); }
        //         console.log("doc: ", doc);
        //     })


    });
}


try {
    console.log("Connessione avvennuta con successo!");
    connection(client);
} catch (e) {
    // perform actions on the collection object
    client.close();
    console.log("Connessione persa!", e);
    connection(client);
}


export async function query() {

    db.users.find().pretty();

    // condizione OR 
    db.users.find({ $or: [{ name: "Luca" }, { age: 18 }] }).pretty();
    // condizione AND
    db.users.find({ name: "Luca", age: 15 }).pretty();

    // multi condizione AND
    db.users.find({ $and: [{ hobbies: "java" }, { hobbies: 'guitar' }] }).pretty();

    db.users.count({ $and: [{ hobbies: "java" }, { hobbies: 'guitar' }] })


    db.users.find({ $and: [{ hobbies: "java" }, { hobbies: 'guitar' }] }).pretty();

    // exists con condizione age >18
    db.users.find({ age: { $exists: true, $gt: 18 } }).pretty();

    // UPDATEONE - $set : modifica un campo della row (non tutto il file)
    db.users.updateOne({ "_id": ObjectId("60d04f1667e192b6a2e8dcf3") }, { $set: { name: 'Luca' } });
    // aggiungo un attributo
    db.users.updateOne({ "_id": ObjectId("60d04f1667e192b6a2e8dcf3") }, { $set: { name: 'Giorgio', birthday: '1990-12-10' } });

    // updateMany - aggiungo a tutte le row, un attributo zipcode
    db.users.updateMany({}, { $set: { zipcode: 100190 } });

    // UPDATE - da evitare, se la condizione è vera, modifica tutto il file con quello che viene inserito (name: 'giorgio')
    db.users.update({ "_id": ObjectId("60d04f1667e192b6a2e8dcf3") }, { name: 'Giorgio' });



    // -----------------------------------------------------
    // ReplaceOne - sostituisce tutta la row 
    db.users.replaceOne({ "_id": ObjectId("60d04f1667e192b6a2e8dcf3") }, {
        "name": "Pluto",
        "age": 21,
        "hobbies": [
            "bass",
            "js"
        ],
        "addresses": [{
                "main": true,
                "city": "Rome",
                "country": "Italy"
            },
            {
                "main": false,
                "city": "Turin",
                "country": "Italy"
            }
        ],
        "birthday": "1990-12-10",
        "zipcode": 100190
    });

    // -----------------------------------------------------
    // DeleteOne
    db.users.deleteOne({ "_id": ObjectId("60d04f1667e192b6a2e8dcf3") });

    // DeleteMany
    db.users.deleteMany({ age: 10 });


}

export async function math() {
    return function calc(operation, ...a) {
        return a.reduce(function(x, y) {
            return eval(x + operation + y);
        })
    }
}

// DESTRUTTURARE UN ARRAY
function summ(arg1, arg2, arg3, arg4) {
    return [].reduce.call(arguments, (a, b) => a + b);
}

let arr = [4, 5, 6, 7];
console.log("summ: ", summ(1, 2, 3, 4, 5, 6, 7, 8));
// Destrutturo l'array arr in 4 elementi di un array
// ...arr => [4, 5, 6, 7] => arr[0] = 4
console.log("summ: ", ...arr, "Somma: ", summ(...arr));


// DESTRUTTURARE UN OBJECT
let obj = { name: 'John', lastName: 'Doe' };

let { name: varNome, lastName: varCognome } = obj;
console.log("Object: ", varNome, varCognome);

let { name: Ilnome, lastName: Ilcognome } = { name: 'Lcaa', lastName: 'sasd' };
console.log("Object2: ", Ilnome, Ilcognome);


let { name, lastName } = { name: 'Rqweqwe', lastName: 'ASFgas' };
console.log("Object3: ", name, lastName);



// --------------------------------------------------------
// CLASSE 
// --------------------------------------------------------
class Alien {

    constructor(weapons, health) {
        this.weapons = weapons || ['pistols'];
        this.health = health || 80;
    }

    getWeapons() {
        return this.weapons;
    }

    increaseHealth(health) {
        this.health += health;
    }

    getHealth() {
        return this.health;
    }
}

let alien = new Alien(['guns', 'lasers'], 100);
let alien2 = new Alien();
Alien.prototype.addWeapon = function(weapon) {
    this.weapons.push(weapon);
}

alien.addWeapon('AK46');
alien.increaseHealth(20);

alien2.addWeapon('hands');

console.log("Class", alien, alien2);


// --------------------------------------------------------
// FUNCTION - la funzione in js viene elaborata prima di eseguire il codice, quindi non è necessario che la chiami dopo
// --------------------------------------------------------
var enemy1 = new EnemyFunc();

function EnemyFunc(type = 'Alien', lives = 12) {
    this.type = type;
    this.lives = lives;
}

console.log("Class/Func: ", enemy1);


// --------------------------------------------------------
// CLASS - deve essere definita prima di essere richiamata (al contrario della funzione)
// --------------------------------------------------------


class EnemyClass {
    constructor(type = 'Alien', lives = 12) {
        this.type = type;
        this.lives = lives;
    }

    static getType() {
        return "Enemy";
    }

    shout() {
        this.calledShout = true;
        this.called = 'gr';
    }
}

var enemy2 = new EnemyClass();
console.log("Class/Func a1: ", enemy2, enemy2.shout());

class Creepers extends EnemyClass {
    constructor(type, lives) {
        // Nel costrutto devo per forza inserire super. È possibile modifica i parametri successivamente
        // con super eredito gli argomenti dalla classe padre (extends)
        super(type, lives);
        this.type = type || 'Orco';
        this.health = 60;
    }


    static getType() {
        return super.getType() + ": Creeper";
    }

    shout() {
        super.shout();
        this.calledShout = false;
        this.called = 'zz';
        return 0;
    }
}


// Per far ereditare tutte le funzioni dagli oggetti bisogna usare "prototype"
Creepers.prototype.getNeWHealth = function() {
    return 160;
}

var creeper1 = new Creepers();
var creeper2 = new Creepers("nano", 5);
var creeper3 = new Creepers("Elfo");
console.log("Class/Func c1 = a1: ", creeper1, creeper1.shout());
console.log("Class/Func c2: ", creeper2, creeper2.shout());

console.log("Class/Func c2 NewHealt: ", creeper2, creeper2.getNeWHealth());

// NB : la funziona static deve essere chiamata dalla classe non dalla variabile
console.log("Class/Func static: ", creeper3, Creepers.getType());