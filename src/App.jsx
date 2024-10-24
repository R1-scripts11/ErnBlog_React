import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Urlconfig from '../urlConfig'; // Importer la configuration URL
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate(); // Utilisation du hook useNavigate
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);
  

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${Urlconfig.apiBaseUrl}/Articles`); // Modifier l'URL selon votre backend
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
    }
  };

  const handleRead = (path) => {
    navigate(path);
  };


  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      {/* <div className="card" style={{'width':'18rem'}}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.article_id} className="article-card">
              <h2></h2>
              <p></p>
              <button className='btn btn-primary'>cdc</button>
             
            </div>
          ))
        ) : (
          <p>Aucun article disponible.</p>
        )}
      </div> */}
            {articles.length > 0 ? (
                articles.map((article) => (
              <Card style={{ width: '18rem' }} key={article.article_id}>
              <Card.Img variant="top"/>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                {article.content}
                </Card.Text>
                <small>Créé le: {new Date(article.created_at).toLocaleDateString()}</small>
                <br/>
                <Button variant="primary" onClick={() => handleRead('/article/'+article.article_id)}>Lire</Button>
              </Card.Body>
            </Card>
              ))
            ) : (
              <p>Aucun article disponible.</p>
            )}
    </>
  );
}

export default App;
