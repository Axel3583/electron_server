const Task = require("../models/TaskModel");
const ObjectId = require("mongodb").ObjectId;

// Crée une nouvelle tâche
const CreateTask = (req, res) => {
  const { item } = req.body; // Accédez au champ 'text' de la requête

  // Vérifiez si le champ 'text' est vide
  if (!item) {
    return res.status(400).send({ message: "Text field is required." });
  }

  // Crée une nouvelle instance de modèle Task avec le champ 'text' fourni
  const todo = new Task({ text: item });
  console.log("todo",todo);

  // Enregistre la nouvelle tâche dans la base de données
  todo
    .save()
    .then((result) => {
      // Répond avec le statut 201 (Créé) et les données de la nouvelle tâche
      res.status(201).send(result);
      console.log("Todo created:", result);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Récupère toutes les tâches
const AllTask = (req, res) => {
  Task.find()
    .then((todos) => {
      // Répond avec toutes les tâches trouvées
      console.log("Todos fetched:", todos);
      res.json(todos);
    })
    .catch((err) => {
      // Gère les erreurs et renvoie un message d'erreur interne
      console.error("Error fetching todos:", err);
      res.status(500).send({ message: "Internal Server Error" });
    });
};

// Récupère une seule tâche par son ID
const SingleTask = (req, res) => {
  const todoId = req.params.id;

  // Vérifie si l'ID de la tâche est au format valide
  if (!ObjectId.isValid(todoId))
    return res.status(400).send({ message: "Invalid ID format" });

  // Recherche la tâche par son ID
  Task.findById(todoId)
    .then((todo) => {
      // Vérifie si la tâche existe, sinon renvoie une réponse 404
      if (!todo) return res.status(404).send({ message: "Todo not found" });

      // Répond avec les données de la tâche trouvée
      res.send(todo);
    })
    .catch((err) => res.status(500).send({ message: "Internal Server Error" }));
};

// Met à jour une tâche existante par son ID
const UpdateTask = (req, res) => {
  const todoId = req.params.id;

  // Vérifie si l'ID de la tâche est au format valide
  if (!ObjectId.isValid(todoId))
    return res.status(400).send({ message: "Invalid ID format" });

  // Met à jour la tâche avec les données fournies dans le corps de la requête
  Task.findByIdAndUpdate(todoId, req.body, { new: true })
    .then((todo) => {
      // Vérifie si la tâche existe, sinon renvoie une réponse 404
      if (!todo) return res.status(404).send({ message: "Todo not found" });

      // Répond avec les données de la tâche mise à jour
      res.send(todo);
    })
    .catch((err) => res.status(500).send({ message: "Internal Server Error" }));
};

// Supprime une tâche par son ID
const DeleteTask = (req, res) => {
  const todoId = req.params.id;

  // Vérifie si l'ID de la tâche est au format valide
  if (!ObjectId.isValid(todoId))
    return res.status(400).send({ message: "Invalid ID format" });

  // Supprime la tâche par son ID
  Task.findByIdAndDelete(todoId)
    .then((result) => {
      // Vérifie si la tâche existe, sinon renvoie une réponse 404
      if (!result) return res.status(404).send({ message: "Todo not found" });

      // Répond avec un message de succès après la suppression
      res.send({ message: "Todo deleted successfully" });
    })
    .catch((err) => res.status(500).send({ message: "Internal Server Error" }));
};

// Exporte les fonctions du contrôleur pour les utiliser ailleurs dans l'application
module.exports = { CreateTask, AllTask, SingleTask, UpdateTask, DeleteTask };
