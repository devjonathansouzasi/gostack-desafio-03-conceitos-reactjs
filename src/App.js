import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  const itemData = {
    "title": "Veio do front",
    "url": "github.com/devjonathansouzasi/gostack-desafio-conceitos-nodejs",
    "techs": ["Express"]
  };

  async function handleAddRepository() {
    try {
      const res = await api.post("repositories", itemData);
      setRepositories([...repositories, res.data]);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const data = repositories.filter(repo => repo.id !== id);
      setRepositories(data); 
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("repositories");
        setRepositories(res.data); 
      } catch (error) {
        setRepositories([]);
      }
    })();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
