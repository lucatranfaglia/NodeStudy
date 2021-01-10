const { default: Swal } = require("sweetalert2");

document.addEventListener("DOMContentLoaded", ()=>{
    // alerts : Collection di element
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(alert =>{
        alert.style.opacity = '0';

        // Per ogni alert presente nella pagina, lo faccio sparire ogni 4 secondi
        setTimeout( ()=>{
            alert.parentNode.removeChild(alert);
        }, 4000);
    })    
})


// Promise
// function showConfirmMsg(title='', msg=''){
//     Swal.fire({
//         title: title || 'Are you sure?',
//         text: msg || 'You won\'t be able to revert this!',
//         type: 'warning',
//         showCancelButton: true,
//         cancelButtonColor:'#d33',
//         confirmButtonText: 'Yes, delete it!',
//         confirmButtonColor: 'green',
//     })
//     .then((result) =>{
//         if(result.value){
//             Swal.fire(
//                 'Deleted!',
//                 'Your file has been deleted.',
//                 'success'
//             )
//         }
//     })
// }

/**
 * // Async/Await
 * @param {string} title 
 * @param {string} msg 
 * @param {string} forname - form+listId
*/
async function showConfirmMsg(title='', msg='', forname){
    const resp = await Swal.fire({
        title: title || 'Are you sure?',
        text: msg || 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor:'#d33',
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: 'green',
    });

    if(resp.value){
        if(document.forms[forname]){
            document.forms[forname].submit();
        }
    }
}
