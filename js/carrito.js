let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("carrito-container");
const total = document.getElementById("total");

renderCarrito();

function renderCarrito() {
    contenedor.innerHTML = "";

    carrito.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");

        div.innerHTML = `
            <div class="fila1">
                <img src="${prod.img}" alt="${escapeHtml(prod.nombre)}">
                <span class="nombre">${escapeHtml(prod.nombre)}</span>
            </div>

            <div class="fila2">
                <span class="precio">$${prod.precio}</span>

                <div class="controles">
                    <button class="menos" data-id="${prod.id}">-</button>
                    <span class="cantidad">${prod.cantidad}</span>
                    <button class="mas" data-id="${prod.id}">+</button>
                </div>

                <button class="eliminar" data-id="${prod.id}">❌</button>
            </div>
        `;

        contenedor.appendChild(div);
    });

    actualizarTotal();
}

function actualizarTotal() {
    const totalCalc = carrito.reduce(
        (acc, prod) => acc + prod.precio * prod.cantidad,
        0
    );

    total.textContent = totalCalc;
}

// BOTÓN "+" / BOTÓN "-"
document.addEventListener("click", e => {

    if (e.target.classList.contains("mas")) {
        const id = Number(e.target.dataset.id);
        const item = carrito.find(p => p.id === id);
        if (item) item.cantidad++;
    }

    if (e.target.classList.contains("menos")) {
        const id = Number(e.target.dataset.id);
        const item = carrito.find(p => p.id === id);
        if (item) {
            item.cantidad--;
            if (item.cantidad <= 0) {
                carrito = carrito.filter(p => p.id !== id);
            }
        }
    }
    // BOTÓN ELIMINAR PRODUCTO DEL CARRITO
    if (e.target.classList.contains("eliminar")) {
        const id = Number(e.target.dataset.id);
        carrito = carrito.filter(p => p.id !== id);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
});

// BOTÓN VACIAR CARRITO
const vaciarBtn = document.getElementById("vaciar");
if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    });
}

function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}
