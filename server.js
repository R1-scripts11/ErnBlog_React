import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

//ORM + CONFIG DB
import { connectToDatabase, sequelize } from './dbConfig.js';
//UTILISATEURS /USERS
import { getUsers, registerUser, checkUserExists, loginUser } from './Queries/UserQueries.js';
//SESSIONS DES UTILISATEURS
import {getSession,DeleteSession} from './Queries/SessionsQueries.js';
//CATEGORIE
import {getCategories,createCategory,updateCategory,deleteCategory} from './Queries/CategoryQueries.js';
//Articles
import {createArticle,getArticles,Article} from './Queries/ArticleQueries.js';

//CORS
import cors from 'cors'; // Importer le middleware cors
//COOKIES PARSER
import cookieParser from 'cookie-parser'; // Importer le middleware cookie-parser

//GENERATEUR DE SID UNIQUE
import { v4 as uuidv4 } from 'uuid'; // Importer uuid pour générer des SID uniques

const app = express();
const port = process.env.PORT || 3001;

// Pour obtenir __filename et __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour analyser le JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Remplacez par l'origine de votre client
  credentials: true, // Autorise les cookies
})); // Utiliser le middleware cors
app.use(cookieParser()); // Utiliser le middleware cookie-parser

(async () => {
  try {
    const connection = await connectToDatabase();
    console.log('Connected to the database');

    // Route pour l'API (exemple)
    app.get('/api/hello', async (req, res) => {
      try {
        const [rows] = await connection.execute('SELECT "Hello from the database!" AS message');
        res.send(rows[0]);
      } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    });

    app.post('/api/addCategorie' , async(req,res) => {
      console.log(req.body)
      const {name, description} = req.body;
      try {
          const addCategorie = await createCategory(name, description); // Pour ajouter une categorie
          res.send({category_id:addCategorie.category_id, name:name, description:description });
      } catch (error) {
        console.error('Error creating categorie:', error.message)
        res.status(500).send({ error: 'Database query failed' });
      }
    })

    app.get('/api/categories', async (req, res) => {
      try {
        const categories = await getCategories();
        res.send(categories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    });

    app.get('/api/Articles', async (req,res) => {
      try {
        const articles = await getArticles();
        // console.log('voici artciles')
        // console.log(articles)
        res.send(articles);
      } catch (error) {
        console.error('Error fetching articles:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    })

    app.get('/api/article/:id', async (req,res) => {
      const { id: article_id } = req.params;
      try {
        const article = await Article(article_id);
        // console.log('voici artciles')
        // console.log(articles)
        res.send(article);
      } catch (error) {
        console.error('Error fetching article:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    })



    app.put('/api/categories/:id', async (req, res) => {
      const { id: category_id } = req.params;
      const { name, description } = req.body;
      try {
          const categories = await updateCategory(category_id, name, description);
          res.send({category_id:categories.category_id, name:name, description:description });
      } catch (error) {
          console.error('Error updating category:', error.message);
          res.status(500).send({ error: 'Database query failed' });
      }
  });

  app.post('/api/createArticle', async (req,res) => {
    const {title,content,authorId,categoryId} = req.body;
    console.log(req.body)
    try {
      const createArticleRes = await createArticle(title, content, authorId, categoryId) 
      res.send({message : createArticleRes.message });
    } catch (error) {
      console.error('Error creating article:', error.message);
      res.status(500).send({ error: 'Database query failed' });
    }
  })

  // Route DELETE pour supprimer une catégorie
  app.delete('/api/delCategories/:id', async (req, res) => {
    const { id: category_id } = req.params;
    try {
        await deleteCategory(category_id);
        res.send({ message: 'Category deleted successfully', category_id });
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).send({ error: 'Database query failed' });
    }
  });

    app.get('/api/users', async (req, res) => {
      try {
        const users = await getUsers();
        res.send(users);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    });

    app.post('/api/registerUser', async (req, res) => {
      const { fullName, username, email, password } = req.body;
      try {
        const userExists = await checkUserExists(username, email);
        if (userExists) {
          if (userExists.username === username) {
            return res.status(400).send({ message: 'Nom d\'utilisateur existe déjà' });
          }
          if (userExists.email === email) {
            return res.status(400).send({ message: 'Email existe déjà' });
          }
        }
        const register = await registerUser(fullName, username, email, password);
        res.send(register);
      } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    });


    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        const login = await loginUser(email, password); // Pour se connecter
        if (!login.isAuthenticated) {
          return res.status(400).send({ message: login.message });
        }
        console.log(' login => ')
        console.log(login)
        // Générer un SID et stocker dans la base de données
        const sid = uuidv4(); // Génère un SID unique
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expiration dans 24 heures

        await sequelize.query(
          'INSERT INTO sessions (sid, expires, data, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
          {
            replacements: [sid, expires, JSON.stringify({ userId: login.user_id, username: login.username , role : login.role})],
            type: sequelize.QueryTypes.INSERT,
          }
        );

        // Créer un cookie avec le SID
        res.cookie('sid', sid, {
          httpOnly: true, // Empêche l'accès au cookie via JavaScript
          //secure: false, // Utiliser seulement avec HTTPS
          expires: expires,
          sameSite: 'Strict', // Ajoute l'option sameSite
        });
        console.log(login)

        res.send({ message: login.message, username : login.username , userId : login.user_id, role : login.role });
      } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    });

    app.get('/api/checkCookie', (req, res) => {
      const sid = req.cookies.sid;
      if (sid) {
        res.send({ message: 'Cookie is present', sid });
      } else {
        res.status(400).send({ message: 'Cookie not found' });
      }
    });

    // Route pour vérifier le cookie de session
    app.get('/api/checkSession', async (req, res) => {
      const sid = req.cookies.sid;
      if (!sid) {
        return res.status(400).send({ message: 'Cookie not found' });
      }

      try {
        const session = await getSession(sid);
        if (!session || session.length === 0) {
          return res.status(400).send({ message: 'Session not found or expired' });
        }
        console.log('checkSessionUserdata')
        console.log(session[0].data)
        res.send({ message: 'Session valid', userId: JSON.parse(session[0].data).userId , username: JSON.parse(session[0].data).username  , role: JSON.parse(session[0].data).role});
      } catch (error) {
        console.error('Error checking session:', error.message);
        res.status(500).send({ error: 'Database query failed' });
      }
    });
    

    app.post('/api/logout', async (req, res) => {
      const sid = req.cookies.sid;
      try {
        const logout = await DeleteSession(sid);
        if (!logout) {
          return res.status(400).send({ message: 'Erreur lors de la suppression de la session' });
        } else {
          res.clearCookie('sid'); // Suppression du Cookie de session.
          return res.send({ message: 'Déconnexion OK' });
        }
      } catch (error) {
        console.error('Error logout:', error.message);
        return res.status(500).send({ error: 'Database query failed' });
      }
    });
    

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Failed to connect to the database. Server not started.', error);
  }
})();
