export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Tri‑Tender</h1>
      <p className="mb-4">
        This template is designed to help you generate customised tender responses.
        Place your tender documents and company documents into the
        <code className="mx-1">tender-input/</code> folder and then instruct the
        AI planner to analyse them.  The AI will populate the configuration
        files under <code className="mx-1">tender-config/</code> and generate
        draft HTML sections under <code className="mx-1">tender-output/</code>.
      </p>
      <p className="mb-4">
        You can extend this page to provide file upload interfaces, previews
        of generated documents and export actions. For a live preview of
        the tender outputs as they are generated, navigate to
        <a href="/preview" className="text-blue-600 underline mx-1">/preview</a>.
      </p>
    </main>
  );
}