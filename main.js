document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    const botonTodos = document.getElementById("todos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const numeritoCarrito = document.getElementById("numerito");
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const aside = document.querySelector('.aside-visible');

    // Datos de ejemplo de productos
    const productos = [
        { id: "portatil-01", titulo: "Portatil 01", imagen: "./img/portatiles/01.jpg", categoria: "portatiles", precio: 1250 },
        { id: "portatil-02", titulo: "Portatil 02", imagen: "./img/portatiles/02.jpg", categoria: "portatiles", precio: 1100 },
        { id: "movil-01", titulo: "Movil 01", imagen: "./img/moviles/01.jpg", categoria: "moviles", precio: 850 },
        { id: "movil-02", titulo: "Movil 02", imagen: "./img/moviles/02.jpg", categoria: "moviles", precio: 909 },
        { id: "television-01", titulo: "Televisiones 01", imagen: "./img/televisiones/01.jpg", categoria: "televisiones", precio: 500 },
        { id: "television-02", titulo: "Televisiones 02", imagen: "./img/televisiones/02.jpg", categoria: "televisiones", precio: 1000 }
    ];

    let carrito = [];

    // Función para renderizar productos
    const renderProductos = (categoria = "todos") => {
        contenedorProductos.innerHTML = ""; // Limpiar productos previos
        const productosFiltrados = categoria === "todos" 
            ? productos 
            : productos.filter(prod => prod.categoria === categoria);

        productosFiltrados.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");
            productoDiv.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            `;
            contenedorProductos.appendChild(productoDiv);
        });

        // Agregar eventos a los botones "Agregar"
        document.querySelectorAll(".producto-agregar").forEach(boton => {
            boton.addEventListener("click", () => {
                const idProducto = boton.dataset.id;
                agregarAlCarrito(idProducto);
            });
        });
    };

    // Función para manejar el carrito
    const agregarAlCarrito = (idProducto) => {
        carrito.push(idProducto);
        numeritoCarrito.textContent = carrito.length;
    };

    // Render inicial con todos los productos
    renderProductos();

    // Manejar cambios de categoría
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesCategorias.forEach(btn => btn.classList.remove("active"));
            boton.classList.add("active");
            const categoria = boton.id;
            renderProductos(categoria);
        });
    });

    // Botón "Todos los productos"
    botonTodos.addEventListener("click", () => renderProductos());
    
    // Manejo de apertura/cierre del menú móvil
    openMenu.addEventListener('click', () => {
        aside.style.transform = 'translateX(0)';
    });

    closeMenu.addEventListener('click', () => {
        aside.style.transform = 'translateX(-100%)';
    });
});
