import { connection } from '../dbConfig.js';

async function getArticleTags() {
  try {
    const [rows] = await connection.execute('SELECT * FROM article_tags');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

async function addTagToArticle(articleId, tagId) {
  try {
    const [result] = await connection.execute(
      'INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)',
      [articleId, tagId]
    );
    return { message: 'Tag added to article successfully' };
  } catch (error) {
    console.error('Error adding tag to article:', error.message);
    throw error;
  }
}

async function removeTagFromArticle(articleId, tagId) {
  try {
    await connection.execute(
      'DELETE FROM article_tags WHERE article_id = ? AND tag_id = ?',
      [articleId, tagId]
    );
    return { message: 'Tag removed from article successfully' };
  } catch (error) {
    console.error('Error removing tag from article:', error.message);
    throw error;
  }
}

export { getArticleTags, addTagToArticle, removeTagFromArticle };
