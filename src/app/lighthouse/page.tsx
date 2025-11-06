const LighthousePage = () => {
  return (
    <main className="container mx-auto p-8">
      <h1 className="font-heading text-molten-orange text-4xl mb-4">
        Lighthouse
      </h1>
      <p className="font-sans text-brand-white mb-4">
        This is the lighthouse page.
      </p>
      <pre className="font-mono bg-steel-gray/20 p-4 rounded-md">
        <code>{/* Code block example */}</code>
      </pre>
    </main>
  );
};

export default LighthousePage;
