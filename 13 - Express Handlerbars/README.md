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
- bcrypt (HASH criptare le password)
- faker (genera dati finti)
- sequelize
- sequelize-cli
- express
- express-handlebars
- express-session
- bootstrap
- method-override
- connect-flash (scrive nella session)
- sweetalert2 (modali)


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


    hooks - cripta la password

        hooks: {
            beforeCreate: (user) => {
                user.password = bc.hashSync(user.password, 12);
            },
        },

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

# Sequelize Validation

Models

    name: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            // non deve essere vuoto
            notEmpty: {
                msg: "Column name cannot be empty"
            },
            // deve essere lungo dai 6 ai 255 caratteri
            len: {
                args: [ 6, 255],
                msg: 'Name length must be betweeen 6 and 255'
            }
        }
    },


# handlebars

file .hbs

    // per attributi creati nella query ma che non sono presenti nel modello
    {{this.dataValues.nTodos}}

    // foreach di todos di
    {{#each todos}}

        // nel caso non trovassi nessun todos
        {{else}}    


file navheader.hbs

    // value="{{q}}" => passato a parametro tramite il file main.hbs

    <input class="form-control" type="text" name="q" value="{{q}}">


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
        // q.value='' : imposta il valore dell'elemento "q" ha vuoto


        <button onclick="this.parentNode.q.value=''">Reset</button>


# Session

salvare i dati da una richiesta e l'altra. La Session è un'area del server dove vengono ad imagazzinare i dati, può essere in memoria, nel file system, in un database, viene identificata direttamente tra il browser e il server con un cookie


# MIDDLEWARE 

Alla creazione di un middleware è necessario che ci sia la funzione NEXT, perché altrimenti la response rimane appesa e qeuindi l'app rimane in loading

    app.use((req, res, next)=>{
        req.session.userId = 1;
        next();
    })

Inserisco flash nella request
    
    app.use(flash());


# JAVASCRIPT 

    <button class="btn btn-danger" title="DELETE LIST" onclick="return confirm('Are you sure you want to delete this items?')">


# HELPERS handlebars-helpers
comando Compare permette a handlebars di fare le comparazioni
