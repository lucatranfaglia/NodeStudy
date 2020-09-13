EventEmitter 
    once (eseguito una sola volta)
    on ()
    off ()
    emit (quando un evento emette una notifica -> notifica)

    listenersCount

    rawListeners



Per gestire l'errore (ad esempio, in assenza di file) esiste la funzione on.('error')


--------------------------------------------
// viene visualizzato il contenuto del file convertito in UTF-8
read.on('readable', () => {
    console.log('stream ready: ', read.read());
})

// viene visualizzato il contenuto del Buffer senza conversione. 
// Per convertire il contenuto del file bisogna convertire il contenuto di data con .toString()
read.on('data', (data) => {
    <!-- visualizzazione del Buffer -->
    console.log('data: ', data);

    <!-- visualizzazione del file convertito in stringa -->
    console.log('data: ', data.toString());
})