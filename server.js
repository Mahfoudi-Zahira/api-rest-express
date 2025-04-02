const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Fichiers JSON
const productsFile = 'products.json';
const ordersFile = 'orders.json';

// Fonction pour lire les données
const readData = (filename) => {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Retourne un tableau vide si le fichier n'existe pas ou est vide
  }
};

// Fonction pour écrire les données
const writeData = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
};

// Route GET pour récupérer tous les produits
app.get('/products', (req, res) => {
  const products = readData(productsFile);
  console.log("Produits récupérés :", products); // ✅ Afficher dans le terminal
  res.json(products);
});

// Route POST pour ajouter un nouveau produit
app.post('/products', (req, res) => {
  const products = readData(productsFile); // ✅ Lire avant d'ajouter
  const newProduct = req.body;  

  products.push(newProduct); // Ajouter le produit
  writeData(productsFile, products); // Sauvegarder

  console.log("Produit ajouté :", newProduct); // ✅ Afficher dans le terminal
  res.status(201).json(newProduct);
});

// Route GET pour récupérer toutes les commandes
app.get('/orders', (req, res) => {
  const orders = readData(ordersFile);
  console.log("Commandes récupérées :", orders); // ✅ Afficher dans le terminal
  res.json(orders);
});

// Route POST pour ajouter une nouvelle commande
app.post('/orders', (req, res) => {
  const orders = readData(ordersFile); // ✅ Lire avant d'ajouter
  const newOrder = req.body;

  orders.push(newOrder); // Ajouter la commande
  writeData(ordersFile, orders); // Sauvegarder

  console.log("Commande ajoutée :", newOrder); // ✅ Afficher dans le terminal
  res.status(201).json(newOrder);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${port}`);
});
