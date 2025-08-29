import { useState } from 'react';
import { RefreshCw, ArrowUpDown } from 'lucide-react';

export default function Filters({ onSortChange, onYearRangeChange, clearAll }) {
  const [sortBy, setSortBy] = useState('popularity-desc');
  const [yearFrom, setYearFrom] = useState(1915);
  const [yearTo, setYearTo] = useState(2025);

  const years = Array.from({ length: 2025 - 1915 + 1 }, (_, i) => 1915 + i);

  const handleYearChange = (from, to) => {
    setYearFrom(from);
    setYearTo(to);
    onYearRangeChange?.({ from, to });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    onSortChange?.(e.target.value);
  };

  const handleClear = () => {
    setSortBy('popularity-desc');
    setYearFrom(1915);
    setYearTo(2025);
    clearAll?.();
  };

  return (
    <div className="d-none d-md-flex align-items-center gap-3">
      <div className="d-flex align-items-center gap-1">
        <select
          className="form-select form-select-sm"
          value={yearFrom}
          onChange={(e) => handleYearChange(Number(e.target.value), yearTo)}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <span>to</span>
        <select
          className="form-select form-select-sm"
          value={yearTo}
          onChange={(e) => handleYearChange(yearFrom, Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="d-flex align-items-center gap-2">
        <ArrowUpDown style={{ width: '20px', height: '20px', opacity: 0.6 }} />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="form-select form-select-sm rounded"
          style={{ width: '120px' }}
        >
          <option value="title-asc">A→Z</option>
          <option value="title-desc">Z→A</option>
        </select>
      </div>

      <button
        onClick={handleClear}
        className="btn btn-outline-secondary d-flex align-items-center gap-2"
      >
        <RefreshCw style={{ width: '16px', height: '16px' }} />
        Reset
      </button>
    </div>
  );
}
