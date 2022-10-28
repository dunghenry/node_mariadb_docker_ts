export const getUsers = 'SELECT * FROM users';
export const checkEmail = 'SELECT * FROM users WHERE email = ?';
export const createUser =
    'INSERT INTO users(username, email, age) VALUES (?, ?, ?)';
export const getUser = 'SELECT * FROM users WHERE id = ?';
export const deleteUser = 'DELETE FROM users WHERE id = ?';
export const updateUser =
    'UPDATE users SET email = ?, password = ?, age = ? WHERE id = ?';
