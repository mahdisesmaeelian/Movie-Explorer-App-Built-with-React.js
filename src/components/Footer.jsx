export default function Footer() {
  return (
    <footer
      className="bg-light text-muted mt-5"
      style={{
        borderTop: '1px solid #dee2e6',
      }}
    >
      <div className="container py-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
        <p className="mb-0 small">
          &copy; 2025 Movie Explorer. All rights reserved.
        </p>
        <div className="d-flex gap-3">
          <a href="#" className="text-decoration-none footer-link">
            About
          </a>
          <a href="#" className="text-decoration-none footer-link">
            Contact
          </a>
          <a href="#" className="text-decoration-none footer-link">
            Privacy
          </a>
        </div>
      </div>
      <style jsx>{`
        .footer-link {
          color: inherit;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #0d6efd; /* رنگ آبی Bootstrap */
        }
      `}</style>
    </footer>
  );
}
