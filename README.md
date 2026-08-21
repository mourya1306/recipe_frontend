# Recipe App Frontend

A React and Vite frontend for browsing, creating, editing, and managing recipes. Authenticated users can also generate recipes from ingredients using the AI recipe workflow.

## Prerequisites

- Node.js 18 or newer
- npm
- The Recipe App backend running locally or at a reachable URL

## Setup

1. Open the frontend directory:

	```bash
	cd recipe_app_frontend
	```

2. Install dependencies:

	```bash
	npm install
	```

3. Create a `.env` file in the project root:

	```env
	VITE_API_URL=http://localhost:3000
	```

	Change the value if your backend uses a different host or port. The backend must provide the API endpoints used by this frontend.

## Run The Application

Start the development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

The application redirects unauthenticated users to `/login`. Create an account or sign in to access the recipe pages.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

## Main Routes

- `/login` - Sign in
- `/signup` - Create an account
- `/home` - Browse recipes
- `/recipes/:id` - View recipe details
- `/my-recipes` - View your recipes
- `/create-recipe` - Create a recipe manually
- `/ai-recipe` - Generate a recipe from ingredients
- `/my-recipes/:id` - Edit one of your recipes
- `/my-profile` - View your profile
- `/about` - About page

## Production Preview

Build and preview the app with:

```bash
npm run build
npm run preview
```

Set `VITE_API_URL` to the production backend URL before building the application.
