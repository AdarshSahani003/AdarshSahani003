export default function JobsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <aside className="md:col-span-1 bg-white rounded shadow p-4">Preferences</aside>
      <section className="md:col-span-3 bg-white rounded shadow p-4">Job listings will appear here</section>
    </div>
  );
}