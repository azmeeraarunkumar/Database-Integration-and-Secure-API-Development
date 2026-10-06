# Render Deployment

The root `render.yaml` defines a Flask API and a React static site.

1. Push the project to GitHub, then create a Blueprint in the Render Dashboard using this repository.
2. Provide the API's `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DEFAULT_PASSWORD` when prompted. The database must be reachable from Render; the private address `10.0.116.125` is not generally reachable from a public cloud service.
3. Set `CORS_ALLOWED_ORIGINS` to the exact HTTPS URL for `database-integration-secure-frontend`, and `REACT_APP_API_URL` to the exact HTTPS URL for `database-integration-secure-api`. Those names are in `render.yaml`; if Render assigns different URLs, update the environment variables in the dashboard and redeploy.
4. Wait for both services to finish deploying, then open the frontend URL and test login. A free API service may take a short time to wake after inactivity.

Render generates the API signing key. Do not commit database credentials or `.env` files.
