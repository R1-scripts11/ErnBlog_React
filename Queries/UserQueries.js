// Queries/UserQueries.js
import { connection } from '../dbConfig.js';
import bcrypt from 'bcrypt';

async function getUsers() {
  try {
    const [rows] = await connection.execute('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

async function checkUserExists(username, email) {
  try {
    const [rows] = await connection.execute(
      'SELECT username, email FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (rows.length > 0) {
      const userExists = {};
      rows.forEach(row => {
        if (row.username === username) {
          userExists.username = username;
        }
        if (row.email === email) {
          userExists.email = email;
        }
      });
      return userExists;
    }
    return null;
  } catch (error) {
    console.error('Error checking if user exists:', error.message);
    throw error;
  }
}

async function registerUser(fullName, username, email, password) {
  try {
    // Hacher le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de "rounds" de hachage

    //Exécution de la requête SQL De type INSERTION
    const [result] = await connection.execute(
      'INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)',
      [fullName, username, email, hashedPassword]
    );
    return { message: 'User registered successfully', userId: result.insertId };
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const [rows] = await connection.execute(
      'SELECT email, username, user_id ,role, password FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return { isAuthenticated: false, message: 'L\'email n\'existe pas' };
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { isAuthenticated: false, message: 'Mot de passe incorrect' };
    }

    return { isAuthenticated: true, message: 'User connected successfully', username: user.username, user_id: user.user_id , role:user.role};

  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw error;
  }
}

//Export des fonctions pour les utiliser à l'extérieur.
export { getUsers, registerUser, checkUserExists, loginUser };
