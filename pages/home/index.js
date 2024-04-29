import { useState } from "react";
import { Header } from "../../components/Header"
import imgit from '../../assets/imgit.png';
import './styles.css';
import ItemList from '../../components/ItemList'

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // Inicialize com null
  const [repos, setRepos] = useState(null); // Inicialize com null

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      setCurrentUser(newUser);

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json(); // Use a variável 'reposData' aqui

      setRepos(newRepos);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={imgit} className="background" alt="imgit app" />
        <div className="info">
          <div>
            <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder="@username" />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser && currentUser.name ? (
          <>
            <div className="perfil">
              <img src={currentUser.avatar_url} className="profile" alt="image de perfil" />
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr />
          </>
          ) : null}
          {repos && repos.length ? (
            <div>
              <h4 className="repositorio"> Repositórios</h4>
              {repos.map(repo => (
                <ItemList key={repo.id} title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
