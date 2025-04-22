# Vite React App Deployment to Google Cloud Platform

This repository contains a GitHub Actions pipeline to build and deploy a Vite-based React application to Google Cloud Storage (GCS) for static hosting. Below is an overview of the pipeline configuration and setup instructions.

## Pipeline Overview

The pipeline is defined in `.github/workflows/deploy.yml` and consists of two main jobs:
1. **Build**: Builds the Vite React application and uploads the artifacts.
2. **Deploy**: Deploys the built artifacts to a Google Cloud Storage bucket.

### Workflow Triggers
The pipeline runs on the following events:
- **Push** to the `main` branch.
- **Manual trigger** via the GitHub Actions workflow dispatch.

### Concurrency
- Ensures only one workflow runs at a time for a given branch to avoid conflicts.
- Cancels in-progress runs if a new run is triggered.

## Jobs

### 1. Build Job
- **Name**: Build Vite React App
- **Runner**: `ubuntu-latest`
- **Node Version**: `20.x`
- **Steps**:
  1. **Checkout Repository**: Uses `actions/checkout@v4` to clone the repository.
  2. **Setup Node.js**: Configures Node.js using `actions/setup-node@v4`.
  3. **Cache Dependencies**: Caches `node_modules` and `~/.npm` using `actions/cache@v4` based on `package-lock.json`.
  4. **Install Dependencies**: Runs `npm ci` to install dependencies.
  5. **Build Project**: Runs `npm run build` with environment variables:
     - `VITE_API_URL`: Backend API URL (stored in GitHub Secrets).
     - `VITE_MAP_TILER_KEY`: MapTiler API key (stored in GitHub Secrets).
  6. **Upload Artifacts**: Uploads the `dist` folder as an artifact using `actions/upload-artifact@v4`.

### 2. Deploy Job
- **Name**: Deploy Vite React App to GCP
- **Runner**: `ubuntu-latest`
- **Dependencies**: Requires the `build` job to complete successfully.
- **Environment Variables**:
  - `PROJECT_ID`: Google Cloud project ID (`training-batch-05`).
  - `GCS_BUCKET`: GCS bucket for deployment (`gs://yana-front`).
- **Steps**:
  1. **Checkout Repository**: Clones the repository again for deployment context.
  2. **Download Artifacts**: Downloads the `dist` folder from the build job using `actions/download-artifact@v4`.
  3. **Authenticate to Google Cloud**: Authenticates using `google-github-actions/auth@v2` with a service account key stored in GitHub Secrets (`GCP_SA_KEY`).
  4. **Upload to GCS Bucket**: Uses `gsutil` to:
     - Sync the `dist` folder to the GCS bucket.
     - Set cache control headers:
       - `.js` and `.css` files: `public, max-age=31536000` (1 year).
       - `index.html`: `no-cache` to ensure fresh content.

## Setup Instructions

### Prerequisites
- A Google Cloud Platform (GCP) project with a GCS bucket configured for static hosting.
- A Service Account with permissions to write to the GCS bucket.
- Node.js and npm installed locally for development.

### Configuration
1. **GitHub Secrets**:
   - Add the following secrets in your repository settings (`Settings > Secrets and variables > Actions`):
     - `GCP_SA_KEY`: JSON key for the GCP service account.
     - `VITE_API_URL`: Backend API URL for the application.
     - `VITE_MAP_TILER_KEY`: MapTiler API key for map features.

2. **GCS Bucket**:
   - Create a bucket (e.g., `yana-front`) in your GCP project.
   - Configure the bucket for static website hosting (optional, depending on requirements).
   - Ensure the service account has `Storage Object Admin` permissions for the bucket.

3. **Repository Setup**:
   - Ensure your project uses Vite and has a `package.json` with a `build` script (e.g., `vite build`).
   - Verify that `package-lock.json` is committed to the repository for dependency caching.

### Running the Pipeline
- **Automatic Trigger**: Push changes to the `main` branch to trigger the pipeline.
- **Manual Trigger**: Go to the `Actions` tab in your GitHub repository, select the workflow, and click `Run workflow`.

## Troubleshooting
- **Build Failures**: Check the GitHub Actions logs for errors in `npm ci` or `npm run build`. Ensure all dependencies are correctly specified in `package.json`.
- **Deployment Failures**: Verify the `GCP_SA_KEY` is valid and has the correct permissions. Check the GCS bucket name and connectivity.
- **Caching Issues**: If assets are not updating, ensure the `Cache-Control` headers are correctly applied, especially `no-cache` for `index.html`.

## Notes
- The pipeline assumes a Vite-based React application. Adjust the build commands if using a different framework.
- The cache control settings optimize performance by caching static assets for a year while ensuring `index.html` is always fresh.
- For production, consider enabling CORS on the GCS bucket if the app makes cross-origin requests.

For further assistance, refer to the [GitHub Actions documentation](https://docs.github.com/en/actions) and [Google Cloud Storage documentation](https://cloud.google.com/storage/docs).