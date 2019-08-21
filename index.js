const express = require("express");
const server = express();
server.use(express.json());

const projects = [];

function returnAllProjects(response) {
  response.json(projects);
}

// Rotas
// Listar todos os projetos
server.get("/projects", (request, response) => {
  return returnAllProjects(response);
});

// Criar um projeto
server.post("/projects", (request, response) => {
  const { id, title } = request.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return returnAllProjects(response);
});

// Alterar um projeto
server.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return response.json(project);
});

// Deletar um projeto
server.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const index = projects.findIndex(p => p.id === id);
  projects.splice(index, 1);

  return response.send();
});

server.listen(3000);
