const prixTotalTTC = product => product.price * 1.25;

const prixTotalTousProduitsAvecTTC = products => {
    return products.map(prixTotalTTC).reduce((acc, prix) => acc + prix, 0);
};

const products = [
    { name: "Shirt", price: 20 },
    { name: "Shoes", price: 50 },
    { name: "Hat", price: 15 }
];

const prixTotal = prixTotalTousProduitsTTC(products);

console.log("Le prix total TTC de tous les produits est :", prixTotal);