import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Urlconfig from '../../urlConfig'; // Importer la configuration URL
import './ReadArticle.css'


function ReadArticle (){

    const { article_id } = useParams(); // Récupérer l'id de l'article depuis l'URL
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetchArticle();
    },[article_id])

    console.log('articles')
    console.log(article)
    const fetchArticle = async () => {
        try {
          const response = await fetch(`${Urlconfig.apiBaseUrl}/Article/${article_id}`);
          const data = await response.json();
          setArticle(data[0]);
        } catch (error) {
          console.error('Erreur lors du chargement de l\'article:', error);
        }
      };
    
      if (!article) {
        return <p>Chargement de l'article...</p>;
      }
    
      return (
        <div className="read-article">
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <div className="article-details">
            <small>Créé le:  {new Date(article.created_at).toLocaleDateString()}</small>
            <br />
            <small>Dernière mise à jour: {new Date(article.updated_at).toLocaleDateString()}</small>
          </div>
        </div>
      );

}

export default ReadArticle;