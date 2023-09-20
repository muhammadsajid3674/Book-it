/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
      DB_URL:
         "mongodb+srv://admin:admin123@cluster0.s4xr5cb.mongodb.net/book_it?retryWrites=true&w=majority",
      BASE_URL: "http://localhost:3000/api",
   },
};

module.exports = nextConfig;
