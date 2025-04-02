import 'dart:convert';
import 'package:http/http.dart' as http;

// URL de l'API
const String baseUrl = 'http://localhost:3000';

// Fonction pour récupérer tous les produits
Future<void> getProducts() async {
  final response = await http.get(Uri.parse('$baseUrl/products'));

  if (response.statusCode == 200) {
    List<dynamic> products = jsonDecode(response.body);
    print('Produits récupérés:');
    products.forEach((product) => print(product));
  } else {
    print('Échec de la récupération des produits');
  }
}

// Fonction pour ajouter un produit
Future<void> addProduct(String name, double price) async {
  final response = await http.post(
    Uri.parse('$baseUrl/products'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'name': name, 'price': price}),
  );

  if (response.statusCode == 201) {
    print('Produit ajouté');
  } else {
    print('Échec de l\'ajout du produit');
  }
}

// Fonction pour récupérer toutes les commandes
Future<void> getOrders() async {
  final response = await http.get(Uri.parse('$baseUrl/orders'));

  if (response.statusCode == 200) {
    List<dynamic> orders = jsonDecode(response.body);
    print('Commandes récupérées:');
    orders.forEach((order) => print(order));
  } else {
    print('Échec de la récupération des commandes');
  }
}

// Fonction pour ajouter une commande
Future<void> addOrder(int productId, int quantity) async {
  final response = await http.post(
    Uri.parse('$baseUrl/orders'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'productId': productId, 'quantity': quantity}),
  );

  if (response.statusCode == 201) {
    print('Commande ajoutée');
  } else {
    print('Échec de l\'ajout de la commande');
  }
}

void main() async {
  await getProducts();  // Afficher les produits existants
  await addProduct('Produit 1', 20.5);  // Ajouter un produit
  await getProducts();  // Afficher à nouveau les produits

  await getOrders();  // Afficher les commandes existantes
  await addOrder(1, 2);  // Ajouter une commande
  await getOrders();  // Afficher à nouveau les commandes
}
