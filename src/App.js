import React,{useState,useEffect} from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]) 

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  } , [])

  async function handleAddRepository() {
    
    const newRepository = {
      title: 'testeReact',
      url: 'testeReact@abc.com',
      techs:["nodeJS", "ReactJS"]
    }
    const response = await api.post('repositories', newRepository)

    const repository = response.data
    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
     
    const response = await api.delete(`repositories/${id}`)
    
    if(response.status === 204){
      console.log(repositories)

      setRepositories(repositories.filter(repository => repository.id != id))
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositories =>

        <li key={repositories.id}>
          {repositories.title}
          <button onClick={() => handleRemoveRepository(repositories.id)}>
            Remover
          </button>

        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
