// carrito.js

// Función para obtener los productos desde el almacenamiento local (localStorage)
function cargarCarrito() {
    // Obtener los productos del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtener el contenedor del carrito
    const contenedorCarrito = document.getElementById('carrito-productos');
    const mensajeVacio = document.getElementById('carrito-vacio');
    const mensajeComprado = document.getElementById('carrito-comprado');
    const totalElement = document.getElementById('Total');
    
    // Si el carrito está vacío, mostrar mensaje de vacío
    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block';
        mensajeComprado.style.display = 'none';
        contenedorCarrito.innerHTML = ''; // Limpiar el contenido del carrito
    } else {
        mensajeVacio.style.display = 'none';
        mensajeComprado.style.display = 'none';

        let total = 0;
        contenedorCarrito.innerHTML = ''; // Limpiar el contenido antes de añadir los productos

        // Recorrer los productos y añadirlos al carrito
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
            const productoHTML = `
                <div class="carrito-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-producto-imagen">
                    <div class="carrito-producto-titulo">
                        <h3>${producto.nombre}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <p>Cantidad: ${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <p>Precio: $${producto.precio.toFixed(2)}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <p>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                    </div>
                    <button class="carrito-producto-eliminar" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            contenedorCarrito.innerHTML += productoHTML;
        });

        // Mostrar el precio total
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Función para manejar la eliminación de un producto
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.id !== id); // Filtrar el producto a eliminar

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Recargar el carrito
    cargarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Eliminar el carrito del localStorage
    cargarCarrito(); // Recargar el carrito
}

// Función para manejar el evento de compra
function comprarAhora() {
    alert('Compra realizada con éxito');
    localStorage.removeItem('carrito'); // Limpiar el carrito después de la compra
    cargarCarrito(); // Recargar el carrito
}

// Agregar los eventos de los botones
document.addEventListener('DOMContentLoaded', () => {
    // Cargar los productos en el carrito al cargar la página
    cargarCarrito();

    // Añadir eventos de eliminación a los botones de eliminar
    document.getElementById('carrito-productos').addEventListener('click', (e) => {
        if (e.target.classList.contains('carrito-producto-eliminar')) {
            const idProducto = parseInt(e.target.dataset.id);
            eliminarProducto(idProducto);
        }
    });

    // Añadir evento para vaciar el carrito
    document.querySelector('.carrito-acciones-vaciar').addEventListener('click', () => {
        vaciarCarrito();
    });

    // Añadir evento para realizar la compra
    document.querySelector('.carrito-acciones-comprar').addEventListener('click', () => {
        comprarAhora();
    });
});
