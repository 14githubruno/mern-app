/**
 * @function
 * Function to set initial state of auth-slice.
 *
 * @param {string} localStorageKey - The key string to be checked in local storage.
 *
 * @returns {string | null} The parsed string if it exists, or null.
 */
const setAuthInitialState = (localStorageKey) => {
  const key = localStorage.getItem(localStorageKey);

  try {
    const initialState = key ? JSON.parse(key) : null;
    return initialState;
  } catch (error) {
    console.error("Invalid data data:", error.message);
  }
};

export { setAuthInitialState };
