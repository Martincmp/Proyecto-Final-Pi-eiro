// CARRITO ------------------------------------ //
const misProductos = [
    { id: 1, nombre: "Maquina Smith", precio: 50, imagen: "./img/Smith Machine DPL3.png" },
    { id: 2, nombre: "Press Inclinado", precio: 40, imagen: "./img/dpl_incline press.png" },
    { id: 3, nombre: "Remo Bajo", precio: 30, imagen: "./img/DPL0311 Incline Lever Row.jpeg" },
    { id: 4, nombre: "Press Banco Plano", precio: 20, imagen: "./img/DBR0408_Olympic-Flat-Bench-3Q-View.jpg" },
    { id: 5, nombre: "Banco Lumbares", precio: 60, imagen: "./img/DBR0312 Back Extension.jpeg" },
    { id: 6, nombre: "Banco Scoth", precio: 70, imagen: "./img/DBR0202 Preacher Curl Bench.jpeg"},
    { id: 7, nombre: "Polea Alta", precio: 70, imagen: "./img/304_pulldown_438wx515h_hero.jpg" },
    { id: 8, nombre: "Polea Remo Bajo", precio: 100, imagen: "./img/302_longpull_472w_hero.png" },
    { id: 9, nombre: "Banco Multiusos", precio: 15, imagen: "./img/Banco Multiusos.png" },
    { id: 10, nombre: "Estacion Abdominal", precio: 15, imagen: "./img/Estacion Abdominal.jpg" },
    { id: 11, nombre: "Femoral", precio: 25, imagen: "./img/Femoral.png" },
    { id: 12, nombre: "Fondos Sentado", precio: 25, imagen: "./img/Fondos Sentado.jpg" },
    { id: 13, nombre: "Fondos y Dominadas", precio: 50, imagen: "./img/Fondos y Dominadas.jpg" },
    { id: 14, nombre: "Jaula Sentadillas", precio: 80, imagen: "./img/Jaula Sentadillas.jpg" },
    { id: 15, nombre: "Prensa Inclinada Piernas", precio: 80, imagen: "./img/Prensa Inclinada Piernas.png" },
    { id: 16, nombre: "Press Declinado", precio: 60, imagen: "./img/Press Declinado.jpg" },
    { id: 17, nombre: "Press Hombros", precio: 50, imagen: "./img/Press Hombros.jpg" },
    { id: 18, nombre: "Press Inclinado", precio: 40, imagen: "./img/Press Inclinado.jpg"},
    { id: 19, nombre: "Press Inclinado Hammer", precio: 50, imagen: "./img/Press Inclinado Hammer.png" },
    { id: 20, nombre: "Sentadilla Hack", precio: 90, imagen: "./img/Sentadilla hack.png" }
]

// INDICAR CANTIDAD DE PRODUCTOS DISPONIBLES ----------- //

function crearProductos(misProductos) {
    let cantProductos = $('.titulo > h3')
    cantProductos.html(`(Tenés ${misProductos.length} productos disponibles)`)
}

crearProductos(misProductos)

//AÑADIR PRODUCTOS ------------------ //

const agregarProductos = document.querySelectorAll('#boton')
agregarProductos.forEach((agregarProducto) => {
    agregarProducto.addEventListener('click', agregarAlClickear)
})

const confirmarCompra = document.querySelector('.confirmarCompra')
confirmarCompra.addEventListener('click', comprar)

const miCarrito = document.querySelector('#carrito')

function agregarAlClickear(event) {
    const button = event.target
    const item = button.closest('.item')

    const itemTitulo = item.querySelector('#titulo').textContent
    const itemPrecio = item.querySelector('#precio').textContent
    const itemImagen = item.querySelector('#imagen').src

    agregarAlCarrito(itemTitulo, itemPrecio, itemImagen)
}

function agregarAlCarrito(itemTitulo, itemPrecio, itemImagen) {

    const elementoCarrito = document.querySelectorAll('.tituloItem')

    for (let i = 0; i < elementoCarrito.length; i++) {
        if (elementoCarrito[i].innerText === itemTitulo) {
            let cantidadElemento = elementoCarrito[i].parentElement.parentElement.parentElement.querySelector('#cantidad')
            cantidadElemento.value++
                actualizarTotalCarrito()
            return
        }

    }

    const filaCarrito = document.createElement('div')

    const contenidoCarrito = `
    <div class="borrar">
    <ul class="carrito" class="list-group mb-3">
        <div class="articulo">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div class="col-sm-4">
                <h6 class="my-0 tituloItem">${itemTitulo}</h6>
                <div class="d-flex align-items-center h-100">
                    <figure>
                        <img src="${itemImagen}" alt="${itemTitulo}" width="50px" height="50px">
                    </figure>
                </div>
            </div>
            <div>
            <input class="col-sm-4" type="number" value="1" id="cantidad">
            <button class="btn btn-danger botonBorrar" type="button">X</button>
        </div>
        <span class="text-muted" id="precio">${itemPrecio}</span>
        </li>
        </div>
    </ul>
    </div>`

    filaCarrito.innerHTML = contenidoCarrito
    miCarrito.append(filaCarrito)

    filaCarrito.querySelector('.botonBorrar').addEventListener('click', borrarItem)

    filaCarrito.querySelector('#cantidad').addEventListener('change', cambiarItem)
    actualizarTotalCarrito()
}

// ACTUALIZAR CARRITO ----------------- //

function actualizarTotalCarrito() {
    let total = 0

    const totalCarrito = document.querySelector('#total')

    const itemsCarrito = document.querySelectorAll('.articulo')

    itemsCarrito.forEach(articulo => {
        const precioItemCarrito = articulo.querySelector('#precio')
        const precioItem = Number(precioItemCarrito.textContent.replace('$', ''))
        const cantidadItem = articulo.querySelector('#cantidad')
        const cantidadItemCarrito = Number(cantidadItem.value)

        total = total + precioItem * cantidadItemCarrito
    })

    totalCarrito.innerHTML = `Total (ARS): $${total}`
}

// BORRAR ITEM DEL CARRITO -------------- //
function borrarItem(event) {
    const clickBoton = event.target

    clickBoton.closest('.borrar').remove()
    actualizarTotalCarrito()
}

// CAMBIAR CANTIDAD DE PRODUCTO ----------- // 
function cambiarItem(event) {
    const tomar = event.target
    if (tomar.value <= 0) {
        tomar.value = 1
    }
    actualizarTotalCarrito()
}

// FINALIZAR COMPRA ----------------------- // 
function comprar() {
    $('.carrito').html('')
    actualizarTotalCarrito()
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu Pedido Fue Exitoso, Pronto Recibiras Tu Pedido',
        showConfirmButton: false,
        timer: 3500
      })
    console.log("Tarea Finalizada");
}


// BUSCADOR ----------------------------------- //

function mostrar() {
    alert("Ups! Pronto tendremos esta información disponible")
}
let buscar = $('#buscador').on('click', mostrar)