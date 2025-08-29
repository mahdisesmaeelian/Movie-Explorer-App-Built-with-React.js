import { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity-desc');
  const [yearRange, setYearRange] = useState({ from: 1915, to: 2025 });

  return (
    <div>
      <Header
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onYearRangeChange={setYearRange}
        clearAll={() => {
          setSearchQuery('');
          setSortBy('popularity-desc');
          setYearRange({ from: 1915, to: 2025 });
        }}
      />

      <main className="container my-4">
        <MovieList
          searchQuery={searchQuery}
          sortBy={sortBy}
          yearRange={yearRange}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
