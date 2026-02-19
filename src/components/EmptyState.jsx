export default function EmptyState({ title, description, cta, onCta }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {cta && <button onClick={onCta}>{cta}</button>}
    </div>
  );
}
