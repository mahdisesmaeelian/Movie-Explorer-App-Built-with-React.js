import { useEffect, useState } from 'react';
import Pagination from './Pagination';
export default function MovieList({ searchQuery, sortBy, yearRange }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMovies(data);
        else if (Array.isArray(data.movies)) setMovies(data.movies);
        else setMovies([]);
      })
      .catch((err) => console.error(err));
  }, []);

  // وقتی سرچ یا فیلتر سال تغییر کرد، به صفحه اول برگرد
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, yearRange]);

  // فیلتر و مرتب‌سازی روی کل movies
  const filteredMovies = movies
    .filter((movie) => {
      const isDefaultYear = yearRange.from === 1915 && yearRange.to === 2025;

      const matchesSearch = searchQuery
        ? movie.originalTitle
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          movie.runtimeMinutes?.toString().includes(searchQuery) ||
          movie.startYear?.toString().includes(searchQuery)
        : true;

      const matchesYear = !isDefaultYear
        ? movie.startYear >= yearRange.from && movie.startYear <= yearRange.to
        : true;

      return matchesSearch && matchesYear;
    })
    .sort((a, b) => {
      if (sortBy === 'title-asc')
        return a.originalTitle?.localeCompare(b.originalTitle) || 0;
      if (sortBy === 'title-desc')
        return b.originalTitle?.localeCompare(a.originalTitle) || 0;
      return 0;
    });

  // Slice برای صفحه‌بندی
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // تعداد کل صفحات
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div>
      <div className="row g-4">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="card h-100 shadow-sm">
              <img
                src={movie.primaryImage || '/fallback-poster.png'}
                alt={movie.originalTitle || 'No title'}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {movie.originalTitle || 'Untitled'} (
                  {movie.startYear || 'N/A'})
                </h5>
                <p className="card-text mb-1">
                  <strong>Genre:</strong>{' '}
                  {Array.isArray(movie.genres)
                    ? movie.genres.join(', ')
                    : movie.genres || 'Unknown'}
                </p>
                <p className="card-text mb-1">
                  <strong>Duration:</strong> {movie.runtimeMinutes || 'N/A'}
                </p>
                {movie.Director && (
                  <p className="card-text">
                    <strong>Director:</strong> {movie.Director}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination با کامپوننت جدا  */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
