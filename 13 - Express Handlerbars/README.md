# TODOLIST con Express

Rimuove tutte le migrazioni fatte, ovvero tutte le tabelle nel db

    sequelize db:migrate:undo:all   

Crea le tabelle nel db tramite i modelli

    sequelize db:migrate  


Realizza degli seeder dove creare utenti fake

    sequelize-cli seed:generate --name insert-users 

Popola nel db utenti fake

    sequelize-cli db:seed:all

# Dependences
- bcrypt (criptare le password)
- faker (genera dati finti)
- sequelize
- sequelize-cli
- express
- express-handlebars
- bootstrap
- method-override


# Sviluppo dei motori di template per Express
Express Handlebars:

    https://expressjs.com/en/resources/template-engines.html

# Engine
per usare THIS sulle pagine html è necessario impostare le configurazioni nel runtimeOptions di hbs.engine (dalla versione > 4 di handlebars).

# Default Folder Handlebars
    view > index.handlebars

app.engine('.hbs', ehb({extname: '.hbs'}));
app.set('view engine', '.hbs');

    view > index.hbs

    view > layouts > main.hbs   // template generale

    view > partials             // pacchetti di html


# Template
I template sono i file prensenti nella cartella VIEWS


# Sequelize Relations between table
Models
    
    associate(models)
        //un model Todo appartiene al model List

        todo.belongsTo(models.List)
        
        // una lista ha tanti Todos

        list.hasMany(models.Todo);

        //un model List appartiene al model User

        list.belongsTo(models.User);

Controllers
    
    findAll

        // includo il modella da collegare

        include: ['List'] 


        List.findAll({

            attributes: attributes,

            subQuery: false,

            include: [

                // LEFT OUTER JOIN - mostra le liste anche se non hanno Todos

                {model: Todo}
                

                // INNER JOIN - mostrare solo le liste che hanno i TODOS

                {model: Todo, required: true}
            ],

            group: ['List.id']
        
    });


    attribues

        // conta i todos di una lista 

        const attributes = {
    
            include: [ 
            
                // funzione conta:[ fn(count, (colonna da contare)), alias ]

                List.sequelize.fn('COUNT', List.sequelize.col('Todos.id')),

                'total'
            ],

            exclude: ['createdAt', 'updatedAt']

        };

# handlebars

file .hbs

    // per attributi creati nella query ma che non sono presenti nel modello
    {{this.dataValues.nTodos}}

    // foreach di todos di
    {{#each todos}}

        // nel caso non trovassi nessun todos
        {{else}}    


# Routes render 
    
    // showBackButton

    res.render('index', {lists: result, showBackButton: false});


# method-override (middleware) 

    Importiamo nell'index la Custum logic del package.
    Differenzia i diversi method (delete, patch...) differenti da post e get


# method

    PUT - modifica tutta la riga nel database
    PATCH - modifica un elemento della riga


# Javascript 

    <form>
        <input type="text" name="q">

        // this : elemento corrente (button)
        // parentNode : il padre di BUTTON (form). parentNode è un array di elementi dove è presente anche "q"
        // q.value='' : imposta elemento con name "q" ha vuoto


        <button onclick="this.parentNode.q.value=''">Reset</button>