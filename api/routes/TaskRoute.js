// Exportation d'un module de gestion des routes pour les tâches
module.exports = (server) => {
    const TaskController = require("../controllers/TaskController"); // Importation du contrôleur de tâches

    // Définition des routes pour les tâches
    server.post("/todo", TaskController.CreateTask); // Route pour créer une nouvelle tâche (HTTP POST)
    server.get("/api/todos", TaskController.AllTask); // Route pour obtenir toutes les tâches (HTTP GET)
    server.delete("/todos/:id", TaskController.DeleteTask); // Route pour supprimer une tâches (HTTP DELETE)
    server.put("/todos/:id", TaskController.UpdateTask);
}
