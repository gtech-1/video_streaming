// List of all auth-related keys in localStorage
const AUTH_KEYS = [
  'token',
  'user',
  'accessToken',
  'refreshToken',
  'userType',
  'userId',
  'email',
  'name',
  'photo',
  'role'
];

/**
 * Clears all authentication-related data from localStorage
 * @returns {void}
 */
export const clearAuthData = () => {
  AUTH_KEYS.forEach(key => {
    localStorage.removeItem(key);
  });
};

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Gets the current user's data
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Gets the current user's type
 * @returns {string|null}
 */
export const getUserType = () => {
  const user = getCurrentUser();
  return user?.userType || null;
}; 