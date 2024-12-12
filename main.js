document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    const botonTodos = document.getElementById("todos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const numeritoCarrito = document.getElementById("numerito");
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const aside = document.querySelector('.aside-visible');

    // Datos actualizados de productos
    const productos = [
        { id: "movil-01", titulo: "Movil 01", imagen: "./img/moviles/01.jpg", categoria: "moviles", precio: 850 },
        { id: "movil-02", titulo: "Movil 02", imagen: "./img/moviles/02.jpg", categoria: "moviles", precio: 909 },
        { id: "movil-03", titulo: "Movil 03", imagen: "./img/moviles/03.jpg", categoria: "moviles", precio: 1249 },
        { id: "movil-04", titulo: "Movil 04", imagen: "./img/moviles/04.jpg", categoria: "moviles", precio: 349 },
        { id: "movil-05", titulo: "Movil 05", imagen: "./img/moviles/05.jpg", categoria: "moviles", precio: 450 },
        { id: "portatil-01", titulo: "Portatil 01", imagen: "./img/portatiles/01.jpg", categoria: "portatiles", precio: 1250 },
        { id: "portatil-02", titulo: "Portatil 02", imagen: "./img/portatiles/02.jpg", categoria: "portatiles", precio: 1100 },
        { id: "portatil-03", titulo: "Portatil 03", imagen: "./img/portatiles/03.jpg", categoria: "portatiles", precio: 650 },
        { id: "portatil-04", titulo: "Portatil 04", imagen: "./img/portatiles/04.jpg", categoria: "portatiles", precio: 450 },
        { id: "portatil-05", titulo: "Portatil 05", imagen: "./img/portatiles/05.jpg", categoria: "portatiles", precio: 909 },
        { id: "portatil-06", titulo: "Portatil 06", imagen: "./img/portatiles/06.jpg", categoria: "portatiles", precio: 899 },
        { id: "portatil-07", titulo: "Portatil 07", imagen: "./img/portatiles/07.jpg", categoria: "portatiles", precio: 700 },
        { id: "portatil-08", titulo: "Portatil 08", imagen: "./img/portatiles/08.jpg", categoria: "portatiles", precio: 400 },
        { id: "television-01", titulo: "Television 01", imagen: "./img/televisiones/01.jpg", categoria: "televisiones", precio: 500 },
        { id: "television-02", titulo: "Television 02", imagen: "./img/televisiones/02.jpg", categoria: "televisiones", precio: 1000 },
        { id: "television-03", titulo: "Television 03", imagen: "./img/televisiones/03.jpg", categoria: "televisiones", precio: 700 },
        { id: "television-04", titulo: "Television 04", imagen: "./img/televisiones/04.jpg", categoria: "televisiones", precio: 550 },
        { id: "television-05", titulo: "Television 05", imagen: "./img/televisiones/05.jpg", categoria: "televisiones", precio: 1200 }
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
        aside.style.transform = 'translateX(100%)';
    });
});
