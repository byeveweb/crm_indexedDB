(function () {
    
    //Variable global que almacenará la conexión a la BD
    let DB;
    
    //Accedemos al DOM - Formulario
    const formulario = document.querySelector('#formulario')

    document.addEventListener('DOMContentLoaded', () => {

        //Abrimos la conexion
        connectDB()

        //Escuchamos al formulario
        formulario.addEventListener('submit', formValidation)
    })
    
    //Función conectar DB
    function connectDB() {

        //Abrimos la conecxión
        const openConn = window.indexedDB.open('crm', 1)
    
        //Si da error
        openConn.onerror = () => console.log('Hubo un error en la conexion')
    
        //Si todo está correcto
        openConn.onsuccess = () => {
            DB = openConn.result;
            console.log(`desde conect... ${DB}`)
        }
        
    
    }

    //Validar los campos del formulario
    function formValidation(e) {
        e.preventDefault();
 
        //Leer los Inputs
        const nombre = document.querySelector('#nombre').value
        const email = document.querySelector('#email').value
        const telefono = document.querySelector('#telefono').value
        const empresa = document.querySelector('#empresa').value

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error')
            return
        }


        //Crear un objeto con la información ( transaction method, lo contrario del destructuring, objectLiteral)

        const cliente = {
            nombre, // nombre: nombre,-> Object Literal
            email, //email: email,
            telefono, //telefono: telefono,
            empresa
        }

        cliente.id = Date.now()
        
        //Creamos un nuevo cliente
        newClientCreate(cliente)
    }


    function newClientCreate(obj) {
        
        console.log(DB)
        
        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm')
        objectStore.put(obj)
        console.log(transaction)

        transaction.onerror = (error) => console.log(error)
        transaction.oncomplete = () => console.log('cliente agregado')

    }
    
})()