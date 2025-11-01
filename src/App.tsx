import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { QueryPlayground } from './pages/QueryPlayground';
import { TablePlayground } from './pages/TablePlayground';
import { VirtualPlayground } from './pages/VirtualPlayground';
import { FormPlayground } from './pages/FormPlayground';
import { RouterPlayground } from './pages/RouterPlayground';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/trial-tanstack">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/query" element={<QueryPlayground />} />
            <Route path="/table" element={<TablePlayground />} />
            <Route path="/virtual" element={<VirtualPlayground />} />
            <Route path="/form" element={<FormPlayground />} />
            <Route path="/router" element={<RouterPlayground />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
