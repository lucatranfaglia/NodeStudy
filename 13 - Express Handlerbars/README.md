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
        
        todo.belongsTo(models.List)

Controllers
    
    findAll

        <!-- includo il modella da collegare -->
        include: ['List'] 