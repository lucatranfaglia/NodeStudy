const express = require('express');
const todosRoutes = require('./routes/todos');
const listsRoutes = require('./routes/lists');
const port = 4000;

// creo un'istanza di express
const app = express();

// POSTMAN POST x-www-form-urlencoded (chiave-valore) : per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
// true: vengono mappati a json anche i paramentri a null e undefined
// false: vengono mappati a json solo stringhe
app.use(express.urlencoded({extended: true}));

// POSTMAN POST raw: per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
app.use(express.json());

// MIDDLEWARE
// const logger = (req, res, next) => {
//     console.log('calling server with params', req.params);
//     next();
// }


// app.all : per tutte le rotte fai qualcosa
// app.all '*' : per tutte le rotte che dichiarerò in questa app (nel routes)
// next : prossimo midleware in coda
app.all('*', (req, res, next)=>{
    console.log('I am the all * middleware');
    // riferimento alla successiva route
    // ritorna alla rotta successiva un'eccessione
    // next(new Error('there was an error'));

    next();
});
  
// per integrare il middleware all'app || se inseriamo il middleware deve essere inserito prima delle rotte 
// app.use(logger);

// 1 opzione: per visualizzare i paramentri della rotta
// app.use('/todos/:id' , logger);

// per quale rotta deve essere utilizzato
app.use('/todos', todosRoutes);


app.use('/lists', listsRoutes);




app.listen(port, ()=>{
    console.log('listening on port '+ process.env.PORT)
})