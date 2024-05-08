var products = [];
const fileInput = document.getElementById('fileInput');
const totalPrice = document.getElementById('totalPrice');

const filterByCategory = (category, products) => {
    return category !== "All" ? products.filter(product => product.category === category) : products;
};

const calculateTotalPrice = (products) => {
    totalPrice.innerText = products.reduce((total, product) => total + product.price, 0) + " DH";
};

const findProductsLowStock = (products) => {
    return products.filter(product => product.stock < 5);
};

const sortProducts = (sortBy, products) => {
    const comparator = sortBy === 'price' ?
        (a, b) => a.price - b.price :
        (a, b) => a.stock - b.stock;
    return [...products].sort(comparator);
};

const searchProducts = (searchTerm, products) => {
    const regex = new RegExp(searchTerm, 'i');
    return products.filter(product => regex.test(product.name));
};

const renderProducts = (products) => {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '';
    let currentRow;

    products.forEach((product, index) => {
        if (index % 4 === 0) {
            currentRow = document.createElement('div');
            currentRow.classList.add('row', 'mb-4');
            appDiv.appendChild(currentRow);
        }
        const card = document.createElement('div');
        card.classList.add('col-md-3', 'mb-3');
        card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-3">${product.name}</h3>
            <p class="card-text">Price: ${product.price}</p>
            <p class="card-text">Category: ${product.category}</p>
            <p class="card-text">Stock: ${product.stock}</p>
          </div>
        </div>
      `;
        currentRow.appendChild(card);
    });
};

const handleFileChange = () => {
    const file = fileInput.files[0];
    fetchProductData(file).then(products => {
        renderProducts(products);
        generateChart(products);
    })
        .catch(error => console.error('Error : ', error));
};

const fetchProductData = (file) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = function () {
            try {
                products = JSON.parse(fr.result);
                resolve(products);
            } catch (error) {
                reject(error);
            }
        };
        fr.readAsText(file);
    });
};

fileInput.addEventListener('change', handleFileChange);

document.getElementById('categorySelect').addEventListener('change', () => renderProducts(
    filterByCategory(document.getElementById('categorySelect').value, products)
));

document.getElementById('calculateTotalPriceBtn').addEventListener('click', () => {
    calculateTotalPrice(products);
});

document.getElementById('findLowStockBtn').addEventListener('click', () => {
    renderProducts(findProductsLowStock(products));
});

document.getElementById('sortBy').addEventListener('change', () => {
    renderProducts(sortProducts(document.getElementById('sortBy').value, products));
});

document.getElementById('searchInput').addEventListener('input', () => renderProducts(
    searchProducts(document.getElementById('searchInput').value, products)
));


function generateChart(products) {
    const labels = products.map(product => product.name);
    const prices = products.map(product => product.price);
    const stocks = products.map(product => product.stock);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Price',
            data: prices,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Stock',
            data: stocks,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const myChart = new Chart(document.getElementById('myChart'), config);
}