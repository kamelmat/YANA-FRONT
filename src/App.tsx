import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import Footer from "./components/Footer";
import { BrowserRouter } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';

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
          {/* <Footer /> */}
        </>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
