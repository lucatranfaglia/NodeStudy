TODOLIST con Express

Dependences
    express


Info
req.query -> abbiamo tutti i paramentrii dall'URL
req.params -> abbiamo tutti i segmenti di una rotta (/:id/)
req.body -> abbiamo tutti i parametri nella post della chiamata

<!-- {...oldTodo, ...newTodo } : lascia le proprietà vecchie che ci sono e modifica solo i paramentri che sono stati modificati in newTodo -->
data.todos[id] = {...oldTodo, ...newTodo };