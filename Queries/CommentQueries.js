import { connection } from '../dbConfig.js';

async function getComments() {
  try {
    const [rows] = await connection.execute('SELECT * FROM comments');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

async function createComment(articleId, userId, content) {
  try {
    const [result] = await connection.execute(
      'INSERT INTO comments (article_id, user_id, content) VALUES (?, ?, ?)',
      [articleId, userId, content]
    );
    return { message: 'Comment created successfully', commentId: result.insertId };
  } catch (error) {
    console.error('Error creating comment:', error.message);
    throw error;
  }
}

async function updateComment(commentId, content) {
  try {
    const [result] = await connection.execute(
      'UPDATE comments SET content = ? WHERE comment_id = ?',
      [content, commentId]
    );
    return { message: 'Comment updated successfully' };
  } catch (error) {
    console.error('Error updating comment:', error.message);
    throw error;
  }
}

async function deleteComment(commentId) {
  try {
    await connection.execute('DELETE FROM comments WHERE comment_id = ?', [commentId]);
    return { message: 'Comment deleted successfully' };
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    throw error;
  }
}

export { getComments, createComment, updateComment, deleteComment };
