export default function WelcomeModal({ open, onClose, onSeed }) {
  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Welcome to Study Assistant AI</h2>
        <p>Get started quickly by seeding sample notes, tasks, and study sessions.</p>
        <div className="actions">
          <button onClick={onSeed}>Seed demo data</button>
          <button className="secondary" onClick={onClose}>
            Continue empty
          </button>
        </div>
      </div>
    </div>
  );
}
