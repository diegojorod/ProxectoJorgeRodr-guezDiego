document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const nombreInput = document.getElementById("nombre");
    const passwordInput = document.getElementById("password");
    const errorNombre = document.getElementById("error-nombre");
    const errorPassword = document.getElementById("error-password");
    const limpiarBtn = document.getElementById("limpiar");

    // Validaciones
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevenir el envío del formulario

        let valid = true;

        // Validación del nombre de usuario
        if (nombreInput.value.trim() === "") {
            errorNombre.textContent = "Nombre obligatorio.";
            valid = false;
        } else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nombreInput.value)) {
            errorNombre.textContent = "Nombre inválido.";
            valid = false;
        } else if (nombreInput.value.length > 20) {
            errorNombre.textContent = "El nombre no puede tener más de 20 caracteres.";
            valid = false;
        } else {
            errorNombre.textContent = ""; // Limpiar mensaje de error si es válido
        }

        // Validación de la contraseña
        if (passwordInput.value.trim() === "") {
            errorPassword.textContent = "La contraseña es obligatoria.";
            valid = false;
        } else if (!/^[A-Za-z0-9·$%&/()]{8,16}$/.test(passwordInput.value)) {
            errorPassword.textContent =
                "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
            valid = false;
        } else {
            errorPassword.textContent = ""; // Limpiar mensaje de error si es válida
        }

        // Si es válido, mostrar alerta
        if (valid) {
            alert("Bienvenido a CarbaShop!");
        }
    });

    // Limpiar datos del formulario
    limpiarBtn.addEventListener("click", () => {
        nombreInput.value = "";
        passwordInput.value = "";
        errorNombre.textContent = "";
        errorPassword.textContent = "";
    });
});
