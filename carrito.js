function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.getElementById('carrito-productos');
    const mensajeVacio = document.getElementById('carrito-vacio');
    const mensajeComprado = document.getElementById('carrito-comprado');
    const totalElement = document.getElementById('Total');

    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block';
        mensajeComprado.style.display = 'none';
        contenedorCarrito.innerHTML = '';
    } else {
        mensajeVacio.style.display = 'none';
        mensajeComprado.style.display = 'none';

        let total = 0;
        contenedorCarrito.innerHTML = ''; // Limpiar el carrito

        carrito.forEach((producto) => {
            const { id, nombre, imagen, precio, cantidad } = producto;
            total += precio * cantidad;

            const productoHTML = `
                <div class="carrito-producto">
                    <img src="${imagen}" alt="${nombre}" class="carrito-producto-imagen">
                    <div class="carrito-producto-titulo">
                        <h3>${nombre}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <p>Cantidad: ${cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <p>Precio: $${precio.toFixed(2)}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <p>Subtotal: $${(precio * cantidad).toFixed(2)}</p>
                    </div>
                    <button class="carrito-producto-eliminar" data-id="${id}">Eliminar</button>
                </div>
            `;
            contenedorCarrito.innerHTML += productoHTML;
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si ya existe, incrementar la cantidad
        productoExistente.cantidad += producto.cantidad;
    } else {
        // Si no existe, agregarlo al carrito
        carrito.push(producto);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter((producto) => producto.id !== id);

    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    cargarCarrito();
}

function comprarAhora() {
    alert('Compra realizada con éxito');
    localStorage.removeItem('carrito');
    cargarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();

    document.getElementById('carrito-productos').addEventListener('click', (e) => {
        if (e.target.classList.contains('carrito-producto-eliminar')) {
            const idProducto = parseInt(e.target.dataset.id, 10);
            eliminarProducto(idProducto);
        }
    });

    document.querySelector('.carrito-acciones-vaciar').addEventListener('click', vaciarCarrito);
    document.querySelector('.carrito-acciones-comprar').addEventListener('click', comprarAhora);
});
