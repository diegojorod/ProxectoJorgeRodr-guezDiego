document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("contenedor-productos");
    const botonTodos = document.getElementById("todos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const numeritoCarrito = document.getElementById("numerito");
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const aside = document.querySelector('.aside-visible');

    let productos = [];
    let carrito = [];

    // Cargar los productos desde el archivo JSON
    const cargarProductos = async () => {
        try {
            const response = await fetch('js/productos.json'); // Asegúrate de que el archivo esté en la misma carpeta o ajusta la ruta
            productos = await response.json();
            renderProductos(); // Renderizamos los productos una vez cargados
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };

    // Función para renderizar productos
    const renderProductos = (categoria = "todos") => {
        contenedorProductos.innerHTML = ""; // Limpiar productos previos
        const productosFiltrados = categoria === "todos" 
            ? productos 
            : productos.filter(prod => prod.categoria.id === categoria); // Cambiar la comparación para acceder a prod.categoria.id

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
    cargarProductos();

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
