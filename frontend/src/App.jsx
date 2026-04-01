import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lok Sabha — these work fine
import NationalView    from './pages/NationalView';
import StateView       from './pages/StateView';
import ConstituencyView from './pages/ConstituencyView';
import IntelligenceView from './pages/IntelligenceView';

// Assembly — lazy loaded so if they crash, only that route crashes
// NOT the whole app
const AssemblyNationalView     = lazy(() => import('./pages/AssemblyNationalView'));
const AssemblyStateView        = lazy(() => import('./pages/AssemblyStateView'));
const AssemblyConstituencyView = lazy(() => import('./pages/AssemblyConstituencyView'));

// Fallback while lazy loading
const Loading = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Loading...</p>
    </div>
  </div>
);

// Error boundary for assembly pages
class AssemblyErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
          <div className="text-center max-w-lg px-8">
            <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-4">Assembly Page Error</p>
            <p className="text-slate-500 text-[10px] font-mono bg-slate-900 p-4 rounded-xl text-left break-all">
              {this.state.error.message}
            </p>
            <a href="/" className="mt-6 inline-block text-blue-500 text-xs font-black uppercase tracking-widest">
              ← Back to Lok Sabha
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Routes>
        {/* Lok Sabha */}
        <Route path="/"                                              element={<NationalView />} />
        <Route path="/intelligence"                                  element={<IntelligenceView />} />
        <Route path="/state/:stateSlug"                              element={<StateView />} />
        <Route path="/state/:stateSlug/constituency/:constituencyId" element={<ConstituencyView />} />
        <Route path="/constituency/:constituencyId"                  element={<ConstituencyView />} />

        {/* Assembly — wrapped in error boundary so crashes don't kill the whole app */}
        <Route path="/assembly" element={
          <AssemblyErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AssemblyNationalView />
            </Suspense>
          </AssemblyErrorBoundary>
        } />
        <Route path="/assembly/state/:stateSlug" element={
          <AssemblyErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AssemblyStateView />
            </Suspense>
          </AssemblyErrorBoundary>
        } />
        <Route path="/assembly/state/:stateSlug/constituency/:constituencyId" element={
          <AssemblyErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AssemblyConstituencyView />
            </Suspense>
          </AssemblyErrorBoundary>
        } />

        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-6xl font-black text-slate-700 mb-4">404</p>
              <a href="/" className="mt-6 inline-block text-blue-500 text-xs font-black uppercase tracking-widest">
                ← Return to Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
