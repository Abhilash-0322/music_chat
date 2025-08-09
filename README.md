# Music Chat Application

A music streaming and chat application with real-time messaging functionality.

## Deployment Instructions for Vercel

### Prerequisites
- A Vercel account
- MongoDB Atlas account or other MongoDB provider
- Cloudinary account (if used for file storage)

### Deployment Steps

1. **Fork or clone this repository to your GitHub account**

2. **Connect your repository to Vercel**
   - Go to [Vercel](https://vercel.com) and log in
   - Click "Import Project" or "New Project"
   - Select your GitHub repository
   - Vercel will automatically detect the project type

3. **Configure Environment Variables**
   Add the following environment variables in the Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT authentication
   - `FRONTEND_URL`: The URL of your deployed application (will be provided by Vercel after deployment)
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your application will be deployed to a URL like `https://your-project-name.vercel.app`

5. **Update Frontend URL**
   - After deployment, update the `FRONTEND_URL` environment variable to match your new Vercel URL

### Limitations

Socket.IO in a serverless environment has some limitations:
- Connections may be interrupted more frequently
- State is not preserved between serverless function invocations

For a production application with heavy real-time requirements, consider:
1. Using a dedicated server for Socket.IO (like Heroku, Digital Ocean, or AWS)
2. Implementing a state management solution with Redis or similar technology

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install --prefix backend
   npm install --prefix frontend
   ```
3. Create a `.env` file in the root directory based on `.env.example`
4. Start the development servers:
   ```
   npm run dev --prefix backend
   npm run dev --prefix frontend
   ```
