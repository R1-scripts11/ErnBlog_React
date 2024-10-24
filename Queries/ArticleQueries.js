import { connection } from '../dbConfig.js';

async function getArticles() {
  try {
    const [rows] = await connection.execute('SELECT * FROM articles');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

async function Article(id) {

  console.log('SELECT * FROM articles WHERE id=' +id+ '')
  try {
    const [rows] = await connection.execute('SELECT * FROM articles WHERE article_id=' +id+ '');
    return rows;
  } catch (error) {
    console.error('Error executing query', error.message );
    throw error;
  }
}

async function createArticle(title, content, authorId, categoryId) {
  try {
    const [result] = await connection.execute(
      'INSERT INTO articles (title, content, author_id, category_id) VALUES (?, ?, ?, ?)',
      [title, content, authorId, categoryId]
    );
    return { message: 'Article created successfully', articleId: result.insertId };
  } catch (error) {
    console.error('Error creating article:', error.message);
    throw error;
  }
}

async function updateArticle(articleId, title, content, categoryId) {
  try {
    const [result] = await connection.execute(
      'UPDATE articles SET title = ?, content = ?, category_id = ? WHERE article_id = ?',
      [title, content, categoryId, articleId]
    );
    return { message: 'Article updated successfully' };
  } catch (error) {
    console.error('Error updating article:', error.message);
    throw error;
  }
}

async function deleteArticle(articleId) {
  try {
    await connection.execute('DELETE FROM articles WHERE article_id = ?', [articleId]);
    return { message: 'Article deleted successfully' };
  } catch (error) {
    console.error('Error deleting article:', error.message);
    throw error;
  }
}

export { getArticles, createArticle, updateArticle, deleteArticle, Article };
