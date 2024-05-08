// Fonction pour afficher les produits dans le DOM
function displayProducts(products) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `<h3>${product.name}</h3>
                                <p>Price: $${product.price}</p>
                                <p>Category: ${product.category}</p>
                                <p>Stock: ${product.stock}</p>`;
        productsDiv.appendChild(productDiv);
    });
}

// Fonction pour filtrer les produits par catégorie
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    let filteredProducts = products;
    if (category) {
        filteredProducts = products.filter(product => product.category === category);
    }
    displayProducts(filteredProducts);
}

// Fonction pour calculer le prix total des produits
function calculateTotalPrice() {
    const totalPrice = products.reduce((total, product) => total + product.price, 0);
    alert(`Total Price: $${totalPrice}`);
}

// Fonction pour trouver les produits en faible stock
function findLowStockProducts() {
    const lowStockProducts = products.filter(product => product.stock < 10);
    displayProducts(lowStockProducts);
}

// Fonction pour trier les produits par prix ou par stock
function sortProducts() {
    const sortType = prompt('Enter "price" to sort by price, or "stock" to sort by stock');
    let sortedProducts;
    if (sortType === 'price') {
        sortedProducts = products.slice().sort((a, b) => a.price - b.price);
    } else if (sortType === 'stock') {
        sortedProducts = products.slice().sort((a, b) => a.stock - b.stock);
    }
    displayProducts(sortedProducts);
}

// Fonction pour rechercher des produits par nom
document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
    displayProducts(filteredProducts);
});

// Fonction pour créer un graphique des prix
function createPriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    const labels = products.map(product => product.name);
    const prices = products.map(product => product.price);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price ($)',
                data: prices,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Fonction pour créer un graphique du stock
function createStockChart() {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const labels = products.map(product => product.name);
    const stock = products.map(product => product.stock);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock',
                data: stock,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Afficher les produits au chargement de la page
displayProducts(products);
// Créer les graphiques au chargement de la page
createPriceChart();
createStockChart();
