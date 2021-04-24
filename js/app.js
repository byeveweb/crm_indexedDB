// Creamos la función IIFE
(function () {
  //Variable global que almacenará el valor del resultado
  let DB
  
  const listClients = document.querySelector('#listado-clientes')

  

  document.addEventListener('DOMContentLoaded', () => {
    //Cramos la BD
    createDB()

    //Listamos los clientes
    if (window.indexedDB.open('crm', 1)) {
      getClient()
    }

    listClients.addEventListener('click', delRegistro)
  })

  //Función crearBD de IndexDB
  function createDB() {
    //Creamos una conexión la BD
    const createDB = window.indexedDB.open('crm', 1)

    //En caso de error la conexión
    createDB.onerror = () => console.log('Hubo un error')

    //En caso de que se pueda crear correctamente
    createDB.onsuccess = () => {
      //Asignamos DB al resultado ok
      DB = createDB.result
    }

    //Registramos todas las columnas se ejecuta una vez
    createDB.onupgradeneeded = (e) => {
      const db = e.target.result

      const objectStore = db.createObjectStore('crm', {
        kyePath: 'id',
        autoIncrement: true,
      })

      //Creamos las columnas
      objectStore.createIndex('nombre', 'nombre', { unique: false })
      objectStore.createIndex('email', 'email', { unique: true })
      objectStore.createIndex('telefono', 'telefono', { unique: false })
      objectStore.createIndex('empresa', 'empresa', { unique: false })
      objectStore.createIndex('id', 'id', { unique: true })

      console.log('DB Lista y creada');
    }
  }

  function getClient() {
    const openConn = window.indexedDB.open('crm', 1)
    
    //Si da error
    openConn.onerror = () => console.log('Hubo un error en la conexion')

    //Si todo está correcto
    openConn.onsuccess = () => {
      DB = openConn.result;
      
      const objectStore = DB.transaction('crm').objectStore('crm')
      objectStore.openCursor().onsuccess = e => {
        const cursor = e.target.result

        if (cursor) {
          const { nombre, empresa, email, telefono, id } = cursor.value
          
          listClients.innerHTML += `
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                  <p class="text-sm leading-10 text-gray-700"> ${email} </p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                  <p class="text-gray-700">${telefono}</p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                  <p class="text-gray-600">${empresa}</p>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                  <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                  <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
              </td>
            </tr>
          `
          cursor.continue()

         }
        else {
          console.log( 'No hay mas registros...')
        }
      }

    }


  }

  function delRegistro(e) {

    if (e.target.classList.contains('eliminar')) {
      const idDelete = Number(e.target.dataset.cliente)
     
      const confirmar = confirm('deseas eliminar este cliente')

      if (confirmar) {
        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm')

        objectStore.delete(idDelete)

        transaction.oncomplete = () => console.log('Eliminando...')
        transaction.onerror = (error) =>  console.log('Hubo un error')
      }
    }

  }
})()
