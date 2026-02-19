export default function InsightCards({ insights }) {
  return (
    <div className="card-grid">
      <article className="card">
        <h3>Top subject</h3>
        <p>{insights.topSubject}</p>
      </article>
      <article className="card">
        <h3>Consistency score</h3>
        <p>{insights.consistency}%</p>
      </article>
      <article className="card">
        <h3>Completion rate</h3>
        <p>{insights.completionRate}%</p>
      </article>
    </div>
  );
}
