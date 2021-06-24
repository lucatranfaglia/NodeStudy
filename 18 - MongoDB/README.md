
# babel setup
https://babeljs.io/setup#nodemon

<!-- ------------------------------------------------------------ -->
# JAVASCRIT ES6

# REST PARAMETER
( a , b, ...c) =>{ 
}
A function definition can have only one ...restParam.
Only the last parameter in a function definition can be a rest parameter.

There are three main differences between rest parameters and the arguments object:
    - The arguments object is not a real array, while rest parameters are Array instances, meaning methods like sort, map, forEach or pop can be applied on it directly;
    - The arguments object has additional functionality specific to itself (like the callee property).
    - The ...restParam bundles all the extra parameters into a single array, therefore it does not contain any named argument defined before the ...restParam. Whereas the arguments object contains all of the parameters -- including all of the stuff in the ...restParam -- unbundled.

# DESTRUCTUTING
let [a, b] = [1 , 2]      // a = 1 , b = 2
 

<!-- ------------------------------------------------------------ -->


# MongoDB import
mongoimport --db cinema --collection movies --type=json --file ./movies.json

# DB
db: cinema
collection: movies

# comand
use cinema
db.movies.find().pretty()
db.movies.find().limit(20).pretty()

<!-- 
    SORT
    1 asc
    -1 desc 

    SORT > LIMIT
    Prima viene ordinato e poi vengono selezionate le row rispetto al LIMIT
-->
db.movies.find().limit(10).sort({title:1})

db.movies.find().limit(10).sort({title:1}).forEach(rec => print(rec.title))

<!-- 
    SKIP vengono saltate il numero di row indicate
    SORT > SKIP > LIMIT
 -->
db.movies.find().skip(101).limit(100).sort({title:1}).forEach(rec => print(rec.title))


db.movies.find().limit(2).sort({"awards.wins":-1, title:1}).pretty()


<!-- CREZIONE DI INDICI -->
<!-- creo un indice con il nome di "title_1_aw" -->
db.mvies.createIndex({title:1, "awards.wins":-1}, {name:"title_1_aw"})

<!-- CANCELLA UN INDICE -->
db.mvies.dropIndex({title:1, "awards.wins":-1}, {name:"title_1_aw"})

<!-- REGEX -->
<!-- Seleziono tutti i film che hanno la lettera A-->
db.movies.find({title:{$regex:/^A/}}).sort({titel:1}).forEach(rec => print(rec.title))
