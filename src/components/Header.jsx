import { useState } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import Filters from './Filters';

export default function Header({ onSearchChange, onSortChange, onYearRangeChange, clearAll }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    onSearchChange?.(e.target.value);
  };

  return (
    <header
      className="sticky-top border-bottom"
      style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
      <div className="container py-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          <div
            className="d-flex justify-content-center align-items-center rounded bg-warning text-white fw-bold shadow"
            style={{ width: '36px', height: '36px' }}
          >
            D
          </div>
          <h1 className="h4 fw-bold mb-0">DigiMovies</h1>

          <div className="position-relative flex-grow-1" style={{ maxWidth: '250px' }}>
            <SearchIcon
              className="position-absolute"
              style={{
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.6,
                width: '20px',
                height: '20px',
              }}
            />
            <input
              value={query}
              onChange={handleQueryChange}
              placeholder="Search ..."
              className="form-control ps-5 pe-4 py-2 rounded"
              style={{ backgroundColor: 'rgba(248, 249, 250, 0.8)' }}
            />
            {query && (
              <button
                className="btn btn-sm position-absolute p-1"
                style={{ right: '5px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={() => {
                  setQuery('');
                  onSearchChange('');
                }}
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>
            )}
          </div>
        </div>

        <Filters
          onSortChange={onSortChange}
          onYearRangeChange={onYearRangeChange}
          clearAll={clearAll}
        />
      </div>
    </header>
  );
}
