let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// abrir/cerrar dropdown
document.addEventListener("DOMContentLoaded", function () {
    const btnCarrito = document.querySelector(".carrito-btn");
    const desplegable = document.querySelector(".desplegableCarrito");

    btnCarrito.addEventListener("click", function () {
        desplegable.classList.toggle("active");
    });

    // agregar productos
    document.querySelectorAll(".btn-agregar").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            const card = e.target.closest(".card");

            const nombre = card.querySelectorAll("p.card-text")[0].innerText;
            const precioTexto = card.querySelectorAll("p.card-text")[1].innerText;
            const precio = parseInt(precioTexto.replace(/[^0-9]/g, ""));

            const existente = carrito.find(function (p) {
                return p.nombre === nombre;
            });

            if (existente) {
                existente.cantidad++;
            } else {
                carrito.push({
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                });
            }

            actualizarCarrito();
        });
    });

    actualizarCarrito();
});

function eliminarProducto(nombre) {
    carrito = carrito.filter(function (p) {
        return p.nombre !== nombre;
    });

    actualizarCarrito();
}

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const contenedor = document.getElementById("carrito-items");
    const totalCarrito = document.getElementById("carrito-total");
    const contador = document.querySelector(".cuentaCarrito");

    contenedor.innerHTML = "";

    let total = 0;
    let cuenta = 0;

    carrito.forEach(function (p) {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;
        cuenta += p.cantidad;

        const item = document.createElement("div");
        item.classList.add("carrito-item");

        item.innerHTML =
            "<div>" +
            "<strong>" + p.nombre + "</strong><br>" +
            p.cantidad + " x $" + p.precio.toLocaleString() +
            "</div>" +
            "<div>" +
            "$" + subtotal.toLocaleString() +
            " <button onclick=\"eliminarProducto('" + p.nombre + "')\">X</button>" +
            "</div>";

        contenedor.appendChild(item);
    });

    contador.innerText = cuenta;
    totalCarrito.innerText = total.toLocaleString();
}