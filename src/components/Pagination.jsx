import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
      <button
        className="btn btn-outline-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        <ArrowLeft size={16} />
      </button>
      <span className="px-3">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn btn-outline-secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
