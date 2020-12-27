const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
    ? repository.filter(repository => repository.title.includes(title))
    : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const likes = 0;
  const repository = { id:uuid(), title, url, techs, likes:likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id );

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not Found."});
  }

  const repository = {
    id,
    title,
    url, 
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id );

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not Found."});
  }

  repositories.splice(repositoryIndex, 1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id );

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Repository does not exists."});
  }

  const likes = repositories[repositoryIndex].likes++;
  
  
  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
