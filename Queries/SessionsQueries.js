// Queries/SessionsQueries.js
import { connection } from '../dbConfig.js';

async function getSession(sid) {
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM sessions WHERE sid = ?',
            [sid]
          );
      //console.log(rows)
      return rows;
    } catch (error) {
      console.error('Error executing query:', error.message);
      throw error;
    }
  }

  async function DeleteSession(sid) {
    try {
      const [result] = await connection.execute(
        'DELETE FROM sessions WHERE sid = ?',
        [sid]
      );
      
      // Vérifie si des lignes ont été affectées
      if (result.affectedRows > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error executing query:', error.message);
      throw error;
    }
  }
  

export {getSession,DeleteSession};