/* Validación */
login_form.addEventListener("submit", e => {
  e.preventDefault();

  const emailCorrecto = "admin@admin.com";
  const passCorrecta = "admin123";

  const usrEmail = email.value.trim();
  const usrPsw = password.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  email_error.textContent = "";
  pass_error.textContent = "";
  login_error.textContent = "";
  login_error.style.display = "none";

  let esValido = true;

  /* Validar correo */
  if (usrEmail === "") {
    email_error.textContent = "El campo correo no puede estar vacío.";
    esValido = false;
  } else if (!emailRegex.test(usrEmail)) {
    email_error.textContent = "El formato del correo no es válido.";
    esValido = false;
  }

  /* Validar contraseña */
  if (usrPsw === "") {
    pass_error.textContent = "El campo contraseña no puede estar vacío.";
    esValido = false;
  } else if (usrPsw.length < 4) {
    pass_error.textContent = "La contraseña debe tener al menos 4 caracteres.";
    esValido = false;
  }

  if (!esValido) return;

  /* Validar correo y contraseña correctas */
  if (usrEmail !== emailCorrecto || usrPsw !== passCorrecta) {
    mostrarError("login_error", "Las credenciales no son válidas");
    return;
  }

  /* Animación para mostrar mensaje de éxito + efecto en el botón ingresar*/

  login_btn.classList.add("btn-exito");
  login_error.classList.remove("show");
  login_error.style.display = "none";
  exito_msg.classList.add("show");

  setTimeout(() => {
    exito_msg.classList.remove("show");

    setTimeout(() => {
      window.location.href = "../pages/bienvenida.html";
    }, 500);

  }, 1600);
});

ocultar_pass.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});


function mostrarError(fieldId, message) {
  const errorElement = document.getElementById(fieldId);

  errorElement.classList.remove("show");
  errorElement.textContent = "✕ " + message;
  errorElement.style.display = "block";

  setTimeout(() => {
    errorElement.classList.add("show");
  }, 10);
}

