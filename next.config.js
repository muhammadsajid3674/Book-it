/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   compiler: {
      styledComponents: true,
   },
   env: {
      DB_URL:
         "mongodb+srv://admin:admin123@cluster0.s4xr5cb.mongodb.net/book_it?retryWrites=true&w=majority",
      BASE_URL: "http://localhost:3000/api",
      NEXTAUTH_SECRET: "Owsz3n/IiSI7CPZSCD3G8xJytTNHUARy93Q4o4JnPSQ=",
      NEXTAUTH_URL: "http://localhost:3000/",
      CLOUDINARY_CLOUD_NAME: "book-it-aacsc",
      CLOUDINARY_CLOUD_KEY: "169137268749475",
      CLOUDINARY_CLOUD_SECRET: "KMvDp5jEs_oudB2ZVVipNEEMU38",
      SMTP_HOST: "sandbox.smtp.mailtrap.io",
      SMTP_PORT: 2525,
      SMTP_USER: "107b7bd07a2f0f",
      SMTP_PASSWORD: "3ef624c4e4a874",
      SMTP_FROM_EMAIL: "noreply@test.com",
      SMTP_FROM_NAME: "Hello world",
   },
   images: {
      domains: ["res.cloudinary.com"],
   },
};

module.exports = nextConfig;
