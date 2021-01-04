# TODOLIST con Express

# ORM - Sequelize

# Dependences
- bcrypt (criptare le password)
- faker (genera dati finti)
- sequelize
- sequelize-cli (-g)
    - sequelize-cli init

# Migrations - aggiungere foreignkey
// USER (create file in migrations)

    sequelize model:generate --name user --attributes id:bigint,name:string,email:string,password:string
// LIST

    sequelize model:generate --name list --attributes name:string,userId:bigint
// TODO

    sequelize model:generate --name todo --attributes todo:string,listId:bigint,completed:boolean

    sequelize db:migrate   
    sequelize db:migrate:undo // se dovessero essere problemi alla migrazione, rimuove la migrazione fatta con l'errore
    sequelize db:migrate:undo:all   // rimuove tutte le migrazioni fatte, ovvero tutte le tabelle nel db


# Model sequelize
- modelName : assegni il nome al modello
- timestamps: false => non aggiunge gli attributi updateAt e createdAt. In caso non venga inserito creerà gli attributi in automatico
- paranoid: true => non cancella fisicamente la riga, ma aggiunge l'attributo deletedAt con la data corrente
- tableName: aassegni il nome della tabella

Per creare una Foreign Key, in sequelize, è necessario specificare la lunghezza della Primary key (12)

# Generate row into db
// User (create file in seeders)

    sequelize-cli seed:generate --name insert-users

// MIGRATE ALL

    sequelize-cli db:seed:all


# Query
// find by Primary key
findByPk    