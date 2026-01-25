import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Quiz Genny</h1>
          <p className="text-xl text-gray-600 mb-8">AI-Assisted Quiz Generation Tool</p>
          <div className="prose prose-lg mx-auto text-left">
            <p className="text-gray-700">
              Create professional, balanced, and verified quiz content with AI assistance. Generate
              PowerPoint presentations ready for live hosting.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">🎯 Smart Generation</h3>
                <p className="text-sm text-blue-800">
                  AI generates candidates, you curate through intuitive accept/reject actions
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">⚖️ Difficulty Balancing</h3>
                <p className="text-sm text-indigo-800">
                  Questions scored across four dimensions for engaging score distributions
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">✅ Fact-Checked</h3>
                <p className="text-sm text-purple-800">
                  All answers verified via web search before final output
                </p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-900 mb-2">📊 Professional Output</h3>
                <p className="text-sm text-pink-800">
                  Presentation-ready PowerPoint with curated imagery
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-sm text-gray-500">
              Foundation setup complete. Features coming in Phase 1...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
