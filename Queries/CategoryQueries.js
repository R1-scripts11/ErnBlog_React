import { connection } from '../dbConfig.js';

async function getCategories() {
  try {
    const [rows] = await connection.execute('SELECT * FROM categories');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

async function createCategory(name, description) {
  try {
    const [result] = await connection.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return { message: 'Category created successfully', category_id: result.insertId, name:result.name, description: result.description  };
  } catch (error) {
    console.error('Error creating category:', error.message);
    throw error;
  }
}

async function updateCategory(categoryId, name, description) {
  try {
    const [result] = await connection.execute(
      'UPDATE categories SET name = ?, description = ? WHERE category_id = ?',
      [name, description, categoryId]
    );
    return { message: 'Category updated successfully', name:name,description:description,category_id:categoryId };
  } catch (error) {
    console.error('Error updating category:', error.message);
    throw error;
  }
}

async function deleteCategory(categoryId) {
  try {
    await connection.execute('DELETE FROM categories WHERE category_id = ?', [categoryId]);
    return { message: 'Category deleted successfully' };
  } catch (error) {
    console.error('Error deleting category:', error.message);
    throw error;
  }
}

export { getCategories, createCategory, updateCategory, deleteCategory };
