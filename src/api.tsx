import axios from 'axios';

const useDevServer = true; // true = php -S (8000), false = XAMPP

const api = axios.create({
  baseURL: useDevServer 
    ? 'http://localhost:8000/Backend/api' 
    : 'http://localhost/fakestore_website_API/api'
});

export default api;