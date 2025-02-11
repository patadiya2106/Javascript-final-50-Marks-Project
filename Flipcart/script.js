let products = JSON.parse(localStorage.getItem("products")) || [];

document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const productName = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const offer = document.getElementById("offer").value.trim();
    const imageUrl = document.getElementById("image-url").value.trim();
    const category = document.getElementById("category").value;

    if (!productName || !price || !imageUrl || !category) {
      alert("Please fill all required fields!");
      return;
    }

    const product = {
      id: Date.now(),
      name: productName,
      price: price,
      offer: offer,
      image: imageUrl,
      category: category,
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    this.reset();
    renderProducts();
  });

function renderProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">₹${product.price}</p>
                    <p class="card-text">${product.offer}</p>
                    <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                    <button class="btn btn-warning" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `;
    productsDiv.appendChild(card);
  });
}

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    document.getElementById("product-name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("offer").value = product.offer;
    document.getElementById("image-url").value = product.image;
    document.getElementById("category").value = product.category;

    products = products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

window.onload = function () {
  products = JSON.parse(localStorage.getItem("products")) || [];
  renderProducts();
};
