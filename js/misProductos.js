// BUSCADOR ----------------------------------- //

function mostrar() {
    alert("Ups! Pronto tendremos esta información disponible")
}
let buscar = $('#buscador').on('click', mostrar)

// CARGAR PRODUCTOS DESTACADOS ---------------- // 

const URL = "js/datos.JSON"
const contenedorProductos = $('#contenedorProductos')

$.getJSON(URL, (response, status) => {
    if (status === "success") {
        response.forEach(function(producto) {
            contenedorProductos.append(`
                    <div class="item selfie col-lg-3 col-sm-6">
                        <figure>
                            <img src="${producto.img}" alt="${producto.name}" width="220px" height="200px">
                            <figcaption>
                                <p>${producto.name} ($ ${producto.precio})</p>
                            </figcaption>
                        </figure>
                    </div>
            `)
        })
    }
}).fail((error) => {
    console.log(error)
}).always(() => {
    console.log("Tarea finalizada");
})
