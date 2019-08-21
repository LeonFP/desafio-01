const express = require("express");
const server = express();
server.use(express.json());

let totalRequests = 0;
const projects = [];

server.use((request, response, next) => {
  totalRequests++;
  console.log(`Total requests: ${totalRequests}`);

  next();
});

function checkProjectExists(request, response, next) {
  const { id } = request.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return response
      .status(400)
      .json({ error: `Project id:${id} does not exists.` });
  }

  next();
}

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
server.put("/projects/:id", checkProjectExists, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const project = projects.find(p => p.id === id);
  project.title = title;

  return response.json(project);
});

// Deletar um projeto
server.delete("/projects/:id", checkProjectExists, (request, response) => {
  const { id } = request.params;

  const index = projects.findIndex(p => p.id === id);
  projects.splice(index, 1);

  return response.send();
});

// Incluir uma task
server.post("/projects/:id/tasks", checkProjectExists, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;
  const project = projects.find(p => p.id === id);
  project.tasks.push(title);

  return response.json(project);
});

server.listen(3000);
