document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const nombre = document.getElementById("nombre");
    const password = document.getElementById("password");
    const errorNombre = document.getElementById("error-nombre");
    const errorPassword = document.getElementById("error-password");
    const limpiarBtn = document.getElementById("limpiar");

    formulario.addEventListener("submit", (event) => {
        // Quitamos event.preventDefault() para permitir que el formulario se procese normalmente
        let isValid = true;

        // Validación del campo "nombre"
        if (nombre.value.trim() === "") {
            errorNombre.textContent = "Nombre obligatorio.";
            errorNombre.style.color = "var(--clr-red)";
            isValid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nombre.value.trim())) {
            errorNombre.textContent = "Nombre inválido.";
            errorNombre.style.color = "var(--clr-red)";
            isValid = false;
        } else if (nombre.value.trim().length > 20) {
            errorNombre.textContent = "El nombre no puede tener más de 20 caracteres.";
            errorNombre.style.color = "var(--clr-red)";
            isValid = false;
        } else {
            errorNombre.textContent = ""; // Limpia el mensaje de error si es válido
        }

        // Validación del campo "password"
        if (password.value.trim() === "") {
            errorPassword.textContent = "La contraseña es obligatoria.";
            errorPassword.style.color = "var(--clr-red)";
            isValid = false;
        } else if (!/^.{8,16}$/.test(password.value.trim()) || 
                   !/^[A-Za-z0-9·$%&/()]+$/.test(password.value.trim())) {
            errorPassword.textContent = 
                "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y ·$%&/().";
            errorPassword.style.color = "var(--clr-red)";
            isValid = false;
        } else {
            errorPassword.textContent = ""; // Limpia el mensaje de error si es válido
        }

        // Si todo es válido, redirige a la página main.html
        if (isValid) {
            window.location.href = "main.html"; // Redirige si el login es exitoso
        }
    });

    // Funcionalidad del botón "Limpiar Datos"
    limpiarBtn.addEventListener("click", () => {
        nombre.value = "";
        password.value = "";
        errorNombre.textContent = "";
        errorPassword.textContent = "";
    });
});
