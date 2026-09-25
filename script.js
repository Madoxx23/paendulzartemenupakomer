// ======= CONFIGURACIÓN =======
const CONFIG = {
  whatsappNumber: "573161539821"
};

const TOPPING_PRICE = 2000;

// ======= DATOS =======
const ICE_CREAM_FLAVORS = [
  "Capuchino", "Oreo", "Frutos Rojos", "Maracuyá", "Chocolate",
  "Nata Maní", "Tres Leches", "Vainilla Chips"
];

const MALTEADA_FLAVORS = [
  "Nata", "Maní", "Maracuyá", "Capuchino", "Tres Leches",
  "Vainilla", "Chips", "Frutos Rojos", "Chocolate", "Brownie"
];

const PRODUCTS = [
  {
    id: "malteada",
    name: "Malteada",
    desc: "Elige tu sabor favorito, bien cremosa y helada.",
    price: 14000,
    img: "img/malteada.webp",
    cat: "malteadas",
    scoops: 0,
    maltaFlavor: true
  },
  {
    id: "gusanito",
    name: "Gusanito",
    desc: "3 bolas de helado, gomas y barquillos.",
    price: 14000,
    img: "img/gusanito.webp",
    cat: "especialidades",
    scoops: 3
  },
  {
    id: "buho",
    name: "Búho",
    desc: "1 bola de helado, goma y galletas.",
    price: 9000,
    img: "img/buho.webp",
    cat: "especialidades",
    scoops: 1
  },
  {
    id: "merengon",
    name: "Súper Merengón Mixto",
    desc: "Merengue, frutas, crema y galletas.",
    price: 15000,
    img: "img/merengon.webp",
    cat: "especialidades",
    scoops: 0
  },
  {
    id: "payasito",
    name: "Payasito",
    desc: "2 bolas de helado, gomas y galleta.",
    price: 11000,
    img: "img/payasito.webp",
    cat: "especialidades",
    scoops: 2
  },
  {
    id: "banana-split",
    name: "Banana Split",
    desc: "3 bolas de helado, frutas y galletas.",
    price: 16000,
    img: "img/banana-split.webp",
    cat: "especialidades",
    scoops: 3
  },
  {
    id: "ensalada-frutas",
    name: "Ensalada de Frutas",
    desc: "Frutas frescas, queso y galletas.",
    price: 13000,
    img: "img/ensalada-frutas.webp",
    cat: "frutas",
    scoops: 0,
    optionalScoop: { extraPrice: 2000, label: "Agregar helado (+$2.000)" }
  },
  {
    id: "salpicon",
    name: "Salpicón con Helado",
    desc: "Frutas, queso, galletas y helado.",
    price: 13000,
    img: "img/salpicon.webp",
    cat: "frutas",
    scoops: 1
  },
  {
    id: "fresas-helado",
    name: "Fresas con Crema y Helado",
    desc: "Fresas, crema, queso, galletas y una bola de helado.",
    price: 15000,
    img: "img/fresas-crema.webp",
    cat: "frutas",
    scoops: 1
  },
  {
    id: "fresas-crema",
    name: "Fresas con Crema",
    desc: "Fresas, crema, queso y galletas.",
    price: 13000,
    img: "img/fresas-crema.webp",
    cat: "frutas",
    scoops: 0
  }
];

const TOPPINGS = [
  { name: "Chips Chocolate", img: "img/topping-chips.webp" },
  { name: "Gomas", img: "img/topping-gomas.webp" },
  { name: "Masmelos", img: "img/topping-masmelos.webp" },
  { name: "Chocolatina", img: "img/topping-chocolatina.webp" },
  { name: "Gomas Tortuga", img: "img/topping-gomas-tortuga.webp" },
  { name: "Chococrispy", img: "img/topping-chococrispy.webp" },
  { name: "Galleta Oreo", img: "img/topping-galleta-oreo.webp" },
  { name: "Chocorramo", img: "img/topping-chocorramo.webp" },
  { name: "M&M", img: "img/topping-mm.webp" },
  { name: "Zucaritas", emoji: "🥣" },
  { name: "Barquillos", emoji: "🍦" },
  { name: "Chocolatina Hershey's", img: "img/topping-hersey.webp" },
  { name: "Bianchi", img: "img/topping-bianchi.webp" },
  { name: "Minichips", img: "img/topping-minichips.webp" },
  { name: "Gomas Ositos", img: "img/topping-gomas-ositos.webp" }
];

// ======= ESTADO =======
let cart = []; // { uid, productId, name, img, unitPrice, qty, flavors, maltaFlavor, withScoop }

function money(n) {
  return "$" + n.toLocaleString("es-CO");
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ======= RENDER MENÚ =======
function renderProducts() {
  const cats = { malteadas: [], especialidades: [], frutas: [] };
  PRODUCTS.forEach(p => cats[p.cat].push(p));

  Object.keys(cats).forEach(catKey => {
    const grid = document.getElementById(`grid-${catKey}`);
    grid.innerHTML = cats[catKey].map((p, i) => `
      <article class="product-card" style="animation-delay:${i * 0.05}s" data-id="${p.id}">
        <div class="product-img-wrap"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="product-footer">
            <span class="price">${money(p.price)}</span>
            <button class="add-btn" aria-label="Agregar ${p.name}">+</button>
          </div>
        </div>
      </article>
    `).join("");
  });
}

function renderToppings() {
  const grid = document.getElementById("grid-toppings");
  grid.innerHTML = TOPPINGS.map((t, i) => `
    <div class="topping-card" style="animation-delay:${i * 0.03}s">
      <div class="topping-img-wrap">
        ${t.img ? `<img src="${t.img}" alt="${t.name}">` : `<span>${t.emoji}</span>`}
      </div>
      <span>${t.name}</span>
    </div>
  `).join("");
}

// ======= NAVEGACIÓN POR CATEGORÍA =======
function initCategoryNav() {
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById(`cat-${btn.dataset.cat}`);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ======= SHEETS (modales) =======
const overlay = document.getElementById("overlay");
const sheets = {
  product: document.getElementById("productSheet"),
  cart: document.getElementById("cartSheet"),
  toppings: document.getElementById("toppingsSheet"),
  checkout: document.getElementById("checkoutSheet"),
  confirm: document.getElementById("confirmSheet")
};

function openSheet(name) {
  closeAllSheets();
  overlay.classList.add("show");
  sheets[name].classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeAllSheets() {
  Object.values(sheets).forEach(s => s.classList.remove("show"));
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

overlay.addEventListener("click", closeAllSheets);
document.getElementById("closeProductSheet").addEventListener("click", closeAllSheets);
document.getElementById("closeCartSheet").addEventListener("click", closeAllSheets);
document.getElementById("closeToppingsSheet").addEventListener("click", returnToCartFromToppings);
document.getElementById("closeCheckoutSheet").addEventListener("click", closeAllSheets);
document.getElementById("closeConfirmSheet").addEventListener("click", closeAllSheets);

// ======= MODAL DE PRODUCTO =======
let currentProduct = null;
let currentSelection = { flavors: [], maltaFlavor: null, withScoop: false, qty: 1 };

function openProductSheet(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  currentProduct = p;
  currentSelection = { flavors: [], maltaFlavor: null, withScoop: false, qty: 1 };

  renderProductSheet();
  openSheet("product");
}

function scoopsNeeded() {
  if (!currentProduct) return 0;
  if (currentProduct.optionalScoop) return currentSelection.withScoop ? 1 : 0;
  return currentProduct.scoops || 0;
}

function renderProductSheet() {
  const p = currentProduct;
  const needed = scoopsNeeded();
  const body = document.getElementById("productSheetBody");

  let flavorHtml = "";
  if (p.maltaFlavor) {
    flavorHtml = `
      <div class="flavor-group">
        <span class="flavor-group-title">Elige el sabor de tu malteada</span>
        <div class="flavor-chips" id="maltaChips">
          ${MALTEADA_FLAVORS.map(f => `<button type="button" class="flavor-chip" data-flavor="${f}">${f}</button>`).join("")}
        </div>
      </div>
    `;
  } else if (p.optionalScoop) {
    flavorHtml = `
      <div class="addon-toggle">
        <span>${p.optionalScoop.label}</span>
        <label class="switch">
          <input type="checkbox" id="optionalScoopToggle">
          <span class="slider"></span>
        </label>
      </div>
      <div id="optionalFlavorArea"></div>
    `;
  } else if (p.scoops > 0) {
    let groups = "";
    for (let i = 0; i < p.scoops; i++) {
      groups += `
        <div class="flavor-group">
          <span class="flavor-group-title">Sabor de helado ${p.scoops > 1 ? `#${i + 1}` : ""}</span>
          <div class="flavor-chips" data-scoop-index="${i}">
            ${ICE_CREAM_FLAVORS.map(f => `<button type="button" class="flavor-chip" data-flavor="${f}">${f}</button>`).join("")}
          </div>
        </div>
      `;
    }
    flavorHtml = groups;
  }

  body.innerHTML = `
    <div class="sheet-product-img"><img src="${p.img}" alt="${p.name}"></div>
    <h3 class="sheet-product-name">${p.name}</h3>
    <p class="sheet-product-desc">${p.desc}</p>
    <div class="sheet-product-price" id="sheetPrice">${money(p.price)}</div>
    ${flavorHtml}
    <div class="qty-row">
      <span class="qty-label">Cantidad</span>
      <div class="qty-stepper">
        <button type="button" id="qtyMinus">−</button>
        <span id="qtyValue">1</span>
        <button type="button" id="qtyPlus">+</button>
      </div>
    </div>
    <button class="btn-primary" id="addToCartBtn">Agregar al carrito · <span id="addToCartTotal">${money(p.price)}</span></button>
  `;

  // Chip listeners
  if (p.maltaFlavor) {
    body.querySelectorAll("#maltaChips .flavor-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        body.querySelectorAll("#maltaChips .flavor-chip").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
        currentSelection.maltaFlavor = chip.dataset.flavor;
        updateAddButtonState();
      });
    });
  } else if (p.optionalScoop) {
    const toggle = document.getElementById("optionalScoopToggle");
    toggle.addEventListener("change", () => {
      currentSelection.withScoop = toggle.checked;
      currentSelection.flavors = [];
      renderOptionalFlavorArea();
      updatePriceDisplay();
      updateAddButtonState();
    });
  } else if (p.scoops > 0) {
    body.querySelectorAll(".flavor-chips").forEach(group => {
      const idx = Number(group.dataset.scoopIndex);
      group.querySelectorAll(".flavor-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          group.querySelectorAll(".flavor-chip").forEach(c => c.classList.remove("selected"));
          chip.classList.add("selected");
          currentSelection.flavors[idx] = chip.dataset.flavor;
          updateAddButtonState();
        });
      });
    });
  }

  document.getElementById("qtyMinus").addEventListener("click", () => {
    if (currentSelection.qty > 1) {
      currentSelection.qty--;
      document.getElementById("qtyValue").textContent = currentSelection.qty;
      updatePriceDisplay();
    }
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    currentSelection.qty++;
    document.getElementById("qtyValue").textContent = currentSelection.qty;
    updatePriceDisplay();
  });

  document.getElementById("addToCartBtn").addEventListener("click", addCurrentToCart);
  updateAddButtonState();
}

function renderOptionalFlavorArea() {
  const area = document.getElementById("optionalFlavorArea");
  if (!currentSelection.withScoop) {
    area.innerHTML = "";
    return;
  }
  area.innerHTML = `
    <div class="flavor-group">
      <span class="flavor-group-title">Sabor de helado</span>
      <div class="flavor-chips" data-scoop-index="0">
        ${ICE_CREAM_FLAVORS.map(f => `<button type="button" class="flavor-chip" data-flavor="${f}">${f}</button>`).join("")}
      </div>
    </div>
  `;
  area.querySelectorAll(".flavor-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      area.querySelectorAll(".flavor-chip").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      currentSelection.flavors[0] = chip.dataset.flavor;
      updateAddButtonState();
    });
  });
}

function unitPriceForCurrent() {
  const p = currentProduct;
  let price = p.price;
  if (p.optionalScoop && currentSelection.withScoop) {
    price += p.optionalScoop.extraPrice;
  }
  return price;
}

function updatePriceDisplay() {
  const total = unitPriceForCurrent() * currentSelection.qty;
  document.getElementById("sheetPrice").textContent = money(unitPriceForCurrent());
  document.getElementById("addToCartTotal").textContent = money(total);
}

function updateAddButtonState() {
  const p = currentProduct;
  const btn = document.getElementById("addToCartBtn");
  let ready = true;

  if (p.maltaFlavor && !currentSelection.maltaFlavor) ready = false;
  if (p.optionalScoop && currentSelection.withScoop) {
    if (!currentSelection.flavors[0]) ready = false;
  }
  if (!p.maltaFlavor && !p.optionalScoop && p.scoops > 0) {
    for (let i = 0; i < p.scoops; i++) {
      if (!currentSelection.flavors[i]) ready = false;
    }
  }

  btn.disabled = !ready;
  updatePriceDisplay();
}

function addCurrentToCart() {
  const p = currentProduct;
  const unitPrice = unitPriceForCurrent();

  let flavorLabel = "";
  if (p.maltaFlavor) {
    flavorLabel = `Sabor: ${currentSelection.maltaFlavor}`;
  } else if (p.optionalScoop) {
    flavorLabel = currentSelection.withScoop
      ? `Con helado sabor: ${currentSelection.flavors[0]}`
      : `Sin helado`;
  } else if (p.scoops > 0) {
    flavorLabel = `Sabores: ${currentSelection.flavors.join(", ")}`;
  }

  cart.push({
    uid: uid(),
    productId: p.id,
    name: p.name,
    img: p.img,
    unitPrice,
    qty: currentSelection.qty,
    detail: flavorLabel,
    toppings: []
  });

  updateCartUI();
  closeAllSheets();
  showToast(`${p.name} agregado al carrito 🎉`);
}

// ======= CARRITO =======
const cartFab = document.getElementById("cartFab");

function cartTotalCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}
function itemToppingsExtra(item) {
  return item.toppings.length * TOPPING_PRICE;
}
function itemSubtotal(item) {
  return item.qty * item.unitPrice + itemToppingsExtra(item);
}
function cartTotalPrice() {
  return cart.reduce((sum, item) => sum + itemSubtotal(item), 0);
}

function updateCartUI() {
  const count = cartTotalCount();
  const total = cartTotalPrice();

  document.getElementById("cartCount").textContent = count === 1 ? "1 producto" : `${count} productos`;
  document.getElementById("cartTotal").textContent = money(total);
  document.getElementById("cartSummaryTotal").textContent = money(total);

  cartFab.classList.toggle("visible", count > 0);
  cartFab.classList.remove("bump");
  void cartFab.offsetWidth;
  cartFab.classList.add("bump");

  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="emoji">🍦</span>
        Tu carrito está vacío.<br>¡Agrega algo delicioso!
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-uid="${item.uid}">
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.detail || ""}</p>
        <button type="button" class="cart-item-toppings-btn${item.toppings.length ? " has-toppings" : ""}">
          🍬 ${item.toppings.length ? `Toppings (${item.toppings.length}) · +${money(itemToppingsExtra(item))}` : "Agregar toppings"}
        </button>
        ${item.toppings.length ? `<p class="cart-item-toppings-list">${item.toppings.join(", ")}</p>` : ""}
        <div class="cart-item-controls">
          <div class="cart-item-qty">
            <button type="button" class="cart-minus">−</button>
            <span>${item.qty}</span>
            <button type="button" class="cart-plus">+</button>
          </div>
          <span class="cart-item-price">${money(itemSubtotal(item))}</span>
          <button type="button" class="remove-btn">🗑</button>
        </div>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".cart-item").forEach(el => {
    const id = el.dataset.uid;
    el.querySelector(".cart-minus").addEventListener("click", () => changeQty(id, -1));
    el.querySelector(".cart-plus").addEventListener("click", () => changeQty(id, 1));
    el.querySelector(".remove-btn").addEventListener("click", () => removeItem(id));
    el.querySelector(".cart-item-toppings-btn").addEventListener("click", () => openToppingsSheet(id));
  });
}

function changeQty(uidVal, delta) {
  const item = cart.find(i => i.uid === uidVal);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.uid !== uidVal);
  }
  updateCartUI();
}

function removeItem(uidVal) {
  cart = cart.filter(i => i.uid !== uidVal);
  updateCartUI();
}

// ======= TOPPINGS DEL CARRITO =======
let currentToppingCartUid = null;

function openToppingsSheet(cartUid) {
  currentToppingCartUid = cartUid;
  renderToppingsSheetBody();
  openSheet("toppings");
}

function renderToppingsSheetBody() {
  const item = cart.find(i => i.uid === currentToppingCartUid);
  if (!item) return;
  const body = document.getElementById("toppingsSheetBody");

  body.innerHTML = `
    <h2 class="sheet-title">Toppings para ${item.name}</h2>
    <p class="section-sub">Elige los que quieras. Cada topping cuesta ${money(TOPPING_PRICE)} adicionales.</p>
    <div class="topping-grid" id="toppingsSelectGrid">
      ${TOPPINGS.map(t => `
        <div class="topping-select-card${item.toppings.includes(t.name) ? " selected" : ""}" data-topping="${t.name}">
          <div class="check-badge">✓</div>
          <div class="topping-img-wrap">
            ${t.img ? `<img src="${t.img}" alt="${t.name}">` : `<span>${t.emoji}</span>`}
          </div>
          <span>${t.name}</span>
          <span class="topping-price">+${money(TOPPING_PRICE)}</span>
        </div>
      `).join("")}
    </div>
    <div class="toppings-extra-row">
      <span>Extra por toppings</span>
      <strong id="toppingsExtraTotal">${money(itemToppingsExtra(item))}</strong>
    </div>
    <button class="btn-primary" id="saveToppingsBtn">Listo</button>
  `;

  body.querySelectorAll(".topping-select-card").forEach(card => {
    card.addEventListener("click", () => {
      const name = card.dataset.topping;
      const idx = item.toppings.indexOf(name);
      if (idx === -1) {
        item.toppings.push(name);
      } else {
        item.toppings.splice(idx, 1);
      }
      card.classList.toggle("selected", item.toppings.includes(name));
      document.getElementById("toppingsExtraTotal").textContent = money(itemToppingsExtra(item));
    });
  });

  document.getElementById("saveToppingsBtn").addEventListener("click", returnToCartFromToppings);
}

function returnToCartFromToppings() {
  currentToppingCartUid = null;
  updateCartUI();
  openSheet("cart");
}

cartFab.addEventListener("click", () => openSheet("cart"));

document.getElementById("goToCheckout").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Agrega productos antes de continuar");
    return;
  }
  openSheet("checkout");
});

// ======= CHECKOUT / WHATSAPP =======
document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const direccion = form.direccion.value.trim();
  const pago = form.pago.value;

  const message = buildWhatsAppMessage({ nombre, telefono, direccion, pago });
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  closeAllSheets();
  setTimeout(() => openSheet("confirm"), 250);

  cart = [];
  updateCartUI();
  form.reset();
});

function buildWhatsAppMessage({ nombre, telefono, direccion, pago }) {
  const lines = [];
  lines.push("🍨 *Nuevo pedido — Pa' Endulzarte* 🍨");
  lines.push("");
  cart.forEach(item => {
    lines.push(`• ${item.qty}x ${item.name} — ${money(itemSubtotal(item))}`);
    if (item.detail) lines.push(`   ${item.detail}`);
    if (item.toppings.length) lines.push(`   Toppings: ${item.toppings.join(", ")} (+${money(itemToppingsExtra(item))})`);
  });
  lines.push("");
  lines.push(`*Total: ${money(cartTotalPrice())}*`);
  lines.push("");
  lines.push(`👤 Nombre: ${nombre}`);
  lines.push(`📞 Teléfono: ${telefono}`);
  lines.push(`📍 Dirección: ${direccion}`);
  lines.push(`💳 Pago: ${pago}`);
  return lines.join("\n");
}

document.getElementById("newOrderBtn").addEventListener("click", closeAllSheets);

// ======= TOAST =======
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ======= EVENTOS DELEGADOS DE PRODUCTOS =======
document.getElementById("menu").addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;
  openProductSheet(card.dataset.id);
});

// ======= INIT =======
renderProducts();
renderToppings();
initCategoryNav();
updateCartUI();

// Resaltar categoría activa al hacer scroll
const sections = document.querySelectorAll(".category-section");
const navButtons = document.querySelectorAll(".cat-btn");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id.replace("cat-", "");
      navButtons.forEach(b => b.classList.toggle("active", b.dataset.cat === id));
    }
  });
}, { rootMargin: "-140px 0px -60% 0px", threshold: 0 });
sections.forEach(s => observer.observe(s));
