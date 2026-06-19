document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");

    console.log("Categoría:", categoria);

    const titulo = document.getElementById("titulo-categoria");

    if (titulo && categoria) {

        const nombresCategorias = {
            hombre: "Hombre",
            mujer: "Mujer",
            accesorios: "Accesorios",
            tecnologia: "Tecnología",
            hogar: "Hogar",
            ofertas: "Ofertas"
        };

        titulo.textContent =
            `Mostrando productos de ${nombresCategorias[categoria] || categoria}`;
    }

    if (!categoria) return;

    const productos = document.querySelectorAll("[data-categoria]");

    console.log("Productos encontrados:", productos.length);

    productos.forEach(producto => {

        if (producto.dataset.categoria !== categoria) {
            producto.style.display = "none";
        }

    });

});