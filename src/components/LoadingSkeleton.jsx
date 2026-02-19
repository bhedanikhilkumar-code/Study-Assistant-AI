export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="skeleton" key={index} />
      ))}
    </div>
  );
}
