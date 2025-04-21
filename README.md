[![Deploy React to GCP](https://github.com/IgrowkerTraining/i005-yana-front/actions/workflows/frontend.yaml/badge.svg)](https://github.com/IgrowkerTraining/i005-yana-front/actions/workflows/frontend.yaml)

<div align="center">
  <img src="src/assets/branding/yana.svg" alt="Yana Logo" width="200"/>
  <br/>
  <img src="src/assets/branding/slogan_en.svg" alt="Yana Slogan" width="400"/>
</div>

## 🚀 About You are not alone

You Are Not Alone connects people through their emotions to combat unwanted loneliness, offering mutual support and reliable resources in an anonymous and safe space.

## 🔗 Project Resources

<div align="center">

[![Figma Design](https://img.shields.io/badge/Figma_Design-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/YPCishcwXKg22v2FFeRUPF/YOUARENOTALONE?node-id=34-11&p=f&t=Jde83WfDARLrzAt4-0)
[![Project's Kanban](https://img.shields.io/badge/Project's_Kanban-0052CC?style=for-the-badge&logo=github&logoColor=white)](https://github.com/orgs/IgrowkerTraining/projects/33/views/1)
[![YANA's Backend](https://img.shields.io/badge/YANA's_Backend-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/IgrowkerTraining/i005-yana-back)

</div>

## 🛠️ Tech Stack

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Biome](https://img.shields.io/badge/Biome-1A1A1A?style=for-the-badge&logo=biome&logoColor=white)](https://biomejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Emotion](https://img.shields.io/badge/Emotion-C076D6?style=for-the-badge&logo=emotion&logoColor=white)](https://emotion.sh/)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)](https://www.i18next.com/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-000000?style=for-the-badge&logo=maplibre&logoColor=white)](https://maplibre.org/)

</div>

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/IgrowkerTraining/i005-yana-front.git

# Navigate to the project directory
cd i005-yana-front

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the development server
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

- `VITE_API_URL`: Base URL for the backend API
- `VITE_MAP_TILES_KEY`: Access token for MapLibre GL map tiles (required for map functionality)

## 🏗️ Project Architecture

```
src/
├── assets/           # Static assets like images, icons, and fonts
├── components/       # Reusable UI components
├── commons/          # Common utilities and shared components
├── config/           # Configuration files and constants
├── hooks/            # Custom React hooks
├── pages/            # Page components and layouts
├── routes/           # Route definitions and navigation logic
├── services/         # API services and data fetching logic
├── store/            # State management with Zustand
├── theme/            # Theme configuration and styling
├── utils/            # Utility functions and helpers
├── App.tsx           # Root application component
├── main.tsx          # Application entry point
├── theme.ts          # Material-UI theme configuration
└── i18n.ts           # Internationalization setup
```
