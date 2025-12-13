// LISTADO DE PRODUCTOS
const productos = [
    { 
        id: 1,
        nombre: "Peperomia", 
        precio: 4000, 
        img: "../img/peperomia.jpg" 
    },
    { 
        id: 2, 
        nombre: "Aglaonema", 
        precio: 5000, 
        img: "../img/aglaonema.jpg" 
    },
    { 
        id: 3, 
        nombre: "Cissus", 
        precio: 6800, 
        img: "../img/cissus.jpg" 
    },
    { 
        id: 4, 
        nombre: "Geranio Hiedra", 
        precio: 6000, 
        img: "../img/geranio-hiedra.jpg" 
    },
    { 
        id: 5, nombre: "Geranio Malvon", 
        precio: 7000, 
        img: "../img/geranio-malvon.jpg" 
    },
    { 
        id: 6, 
        nombre: "Helecho de Arroz", 
        precio: 4000, 
        img: "../img/helecho-de-arroz.jpg" 
    },
    { 
        id: 7, 
        nombre: "Warnequi", 
        precio: 2500, 
        img: "../img/warnequi.jpg" 

    },
    { 
        id: 8, 
        nombre: "Yuca", 
        precio: 40000, 
        img: "../img/yuca.jpg" 

    }
];

const contenedor = document.getElementById("prod-container");
const cartCount = document.getElementById("cart-count");

// RECUPERAR CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// MOSTRAR CONTADOR INICIAL
actualizarContador();

//GENERAR CARDS

productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("prod-items");

    card.innerHTML = `
        <div class="item-img">
            <img class="img-card" src="${prod.img}" alt="${prod.nombre}">
        </div>
        <div class="item-name">${prod.nombre}</div>

        <div class="info-prod">
            <span class="precio">$${prod.precio}</span>
        </div>

        <div class="btn-container">
            <button class="btn-añadir" data-id="${prod.id}">AÑADIR AL CARRITO</button>
        </div>
    `;

    contenedor.appendChild(card);
});


// AÑADIR PRODUCTO AL CARRITO

document.addEventListener("click", e => {
    if (e.target.classList.contains("btn-añadir")) {
        const id = Number(e.target.dataset.id);
        agregarAlCarrito(id);
    }
});

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    const itemExistente = carrito.find(p => p.id === id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
    mostrarModal();
}

function actualizarContador() {
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    cartCount.textContent = total;
}

// MENSAJE DE PRODUCTO AGREGADO AL CARRITO - MODAL
const modalBg = document.getElementById("modal-bg");
const cerrarModal = document.getElementById("cerrar-modal");

function mostrarModal() {
    modalBg.classList.add("show");

    setTimeout(() => {
        modalBg.classList.remove("show");
    }, 2000);
}

cerrarModal.addEventListener("click", () => {
    modalBg.classList.remove("show");
});
