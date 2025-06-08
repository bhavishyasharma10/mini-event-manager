# Mini Event Manager - Setup Guide

This guide will help you set up and run the Mini Event Manager project locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (for version control)

## Project Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-event-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env.local` file in the root directory
   - Add any required environment variables (if any are needed)

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

This will start the development server using Turbopack. The application will be available at `http://localhost:3000`.

### Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Docker Deployment

The project includes a Dockerfile for containerized deployment. To build and run using Docker:

```bash
# Build the Docker image
docker build -t mini-event-manager .

# Run the container
docker run -p 3000:3000 mini-event-manager
```

## Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Creates a production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check code quality

## Project Structure

- `/src` - Source code directory
- `/public` - Static assets
- `/src/app` - Next.js app directory
- `/src/components` - React components
- `/src/lib` - Utility functions and shared code
- `/src/hooks` - Reusable Hooks used
- `/src/graphql` - GraphQL schema and resolvers

## Technology Stack

- **Frontend**: Next.js 15.3.3 with React 19
- **Styling**: Tailwind CSS
- **API**: GraphQL with Apollo Server
- **Form Handling**: Formik with Yup validation
- **Language**: TypeScript
- **Development**: ESLint, PostCSS

## Troubleshooting

1. **Node Version Issues**
   - Ensure you're using Node.js v18 or higher
   - Use `node -v` to check your version

2. **Dependency Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Build Issues**
   - Clear the `.next` directory
   - Run `npm run build` again

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

If you encounter any issues during setup or have questions, please:
1. Check the troubleshooting section above
2. Review the project's README.md for additional information
3. Open an issue in the project repository 