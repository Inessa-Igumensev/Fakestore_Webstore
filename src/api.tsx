import axios from "axios";

const usePhpServer = false; 
// true  = php -S localhost:8000
// false = XAMPP

export const API_BASE_URL = usePhpServer
  ? "http://localhost:8000/Backend/api"
  : "http://localhost/fakestore_website_API/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export function getImageUrl(imagePath: string) {
  if (!imagePath) return "";

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return `${API_BASE_URL}/${imagePath.replace(/^\/+/, "")}`;
}

export default api;