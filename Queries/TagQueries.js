import { connection } from '../dbConfig.js';

async function getTags() {
  try {
    const [rows] = await connection.execute('SELECT * FROM tags');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

async function createTag(name) {
  try {
    const [result] = await connection.execute(
      'INSERT INTO tags (name) VALUES (?)',
      [name]
    );
    return { message: 'Tag created successfully', tagId: result.insertId };
  } catch (error) {
    console.error('Error creating tag:', error.message);
    throw error;
  }
}

async function updateTag(tagId, name) {
  try {
    const [result] = await connection.execute(
      'UPDATE tags SET name = ? WHERE tag_id = ?',
      [name, tagId]
    );
    return { message: 'Tag updated successfully' };
  } catch (error) {
    console.error('Error updating tag:', error.message);
    throw error;
  }
}

async function deleteTag(tagId) {
  try {
    await connection.execute('DELETE FROM tags WHERE tag_id = ?', [tagId]);
    return { message: 'Tag deleted successfully' };
  } catch (error) {
    console.error('Error deleting tag:', error.message);
    throw error;
  }
}

export { getTags, createTag, updateTag, deleteTag };
