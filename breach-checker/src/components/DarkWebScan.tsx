export function DarkWebScan() {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 200);
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="h-2 bg-gray-300 rounded">
          <div
            className="h-full bg-red-600 rounded transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2">Scanning dark web forums...</p>
      </div>
    );
  }