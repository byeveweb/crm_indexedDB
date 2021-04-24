// function connectDB() {

//     //Abrimos la conecxión
//     const openConn = window.indexedDB.open('crm', 1)

//     //Si da error
//     openConn.onerror = () => console.log('Hubo un error en la conexion')

//     //Si todo está correcto
//     openConn.onsuccess = () => {
//         DB = openConn.result;
//         console.log(`desde conect... ${DB}`)
//     }
    

// }




// function imprimirAlerta(men, type) {

//     const showAlert = document.querySelector('.alerta')

//     if(!showAlert) {
//         const divAlert = document.createElement('div')
//         divAlert.classList.add('px-7', 'py-3', 'rounder', 'max-w-lg', 'max-auto', 'mt-6', 'text-center', 'border', 'alerta')

//         if (type === 'error') {
//             divAlert.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
//         } else {
//             divAlert.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
//         }
        
//         divAlert.textContent = men
//             formulario.appendChild(divAlert)
//     }
// }
