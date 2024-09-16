/**
 * @constant
 * The base URL for API requests.
 * @type {string}
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * @constant
 * API endpoint for user-related operations.
 * @type {string}
 */
const API_USERS = "/api/users";

/**
 * @constant
 * API endpoint for tvseries-related operations.
 * @type {string}
 */
const API_TVSERIES = "/api/tvseries";

export { BASE_URL, API_USERS, API_TVSERIES };
