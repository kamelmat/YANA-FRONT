import AppRoutes from "./routes/AppRoutes";
import BottomNav from "./components/BottomNav";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <>
          <Sidebar />
          <Header />
          <AppRoutes />
          <BottomNav />
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
