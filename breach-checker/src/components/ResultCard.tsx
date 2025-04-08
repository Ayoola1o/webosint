export function ResultCard({ breachCount, sources }: { breachCount: number; sources: string[] }) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">
          {breachCount > 0 ? "🚨 Breaches Found" : "✅ No Known Breaches"}
        </h2>
        {breachCount > 0 && (
          <div className="mt-4">
            <p>Found in {breachCount} breaches:</p>
            <ul className="list-disc pl-6">
              {sources.map((source) => (
                <li key={source} className="text-gray-700">{source}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }