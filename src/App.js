import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import api from './services/api';

function App() {
  const [projects, setProjects] = useState([]);  

  useEffect(() => {
    async function getProjects() {
      const response = await api.get('projects');

      setProjects(response.data);

    }

    getProjects();
  },[]);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title : `Novo Projeto ${Date.now()}`,
      owner : "Ruan Aragão"
    });

    setProjects([...projects, response.data])
  } 

  return (
    <>
      <Header title="Projetos" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject} >Add project</button>

    </>
   
  );
}

export default App;
