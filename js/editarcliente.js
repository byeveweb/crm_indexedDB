(function () {

    let DB;
    let idCliente;
    const formulario = document.querySelector('#formulario')

    const nombreInput = document.querySelector('#nombre')
    const emailInput = document.querySelector('#email')
    const telefonoInput = document.querySelector('#telefono')
    const empresaInput = document.querySelector('#empresa')

    


    document.addEventListener('DOMContentLoaded', () => {

        connectDB()
        formulario.addEventListener('submit', actualizarCliente)
        //Leer parámetros de las URL's
        const parametresURL = new URLSearchParams(window.location.search)
        idCliente = parametresURL.get('id')

        if (idCliente) {

            setTimeout(() => {
            //To-Do: Async
                obtenerCliente(idCliente)
            }, 1000)
        }

      

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

    function obtenerCliente(id) {

        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm')

        const cliente = objectStore.openCursor();

        cliente.onsuccess = e => {
            const cursor = e.target.result

            if (cursor) {
                
                if (cursor.value.id === Number(id)) {
                   llenarFormulario(cursor.value)
                }
                
                
                cursor.continue();
            }

        }

    }

    function llenarFormulario(datosCliente) {
        const { nombre, email, telefono, empresa } = datosCliente
        nombreInput.value = nombre
        empresaInput.value = empresa
        emailInput.value = email
        telefonoInput.value = telefono
    }

  

    function actualizarCliente(e) {
        e.preventDefault();

        if (nombreInput.value === '' || 
            telefonoInput.value === '' || 
            emailInput.value === '' || 
            empresaInput.value === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error')
            return
            }

        const actuCliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            nombre: nombreInput.value,
            id: Number(idCliente)
        }
        console.log(actuCliente)

        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm')
        objectStore.put(actuCliente)
        

        transaction.oncomplete = () => imprimirAlerta('Editado correctamente')
        transaction.onerror = (error) => {
            console.log(error)
            console.log('Hubo un erroorrr')
        }

    }
    function imprimirAlerta(men, type) {

    const showAlert = document.querySelector('.alerta')

    if(!showAlert) {
        const divAlert = document.createElement('div')
        divAlert.classList.add('px-7', 'py-3', 'rounder', 'max-w-lg', 'max-auto', 'mt-6', 'text-center', 'border', 'alerta')

        if (type === 'error') {
            divAlert.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
        } else {
            divAlert.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
        }
        
        divAlert.textContent = men
            formulario.appendChild(divAlert)
    }
}
})()    

    