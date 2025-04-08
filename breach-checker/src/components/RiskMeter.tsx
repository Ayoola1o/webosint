// frontend/src/components/RiskMeter.tsx
interface RiskMeterProps {
    value: number;
    className?: string;
  }
  
  export default function RiskMeter({ value, className = '' }: RiskMeterProps) {
    const getColor = (val: number) => {
      if (val < 30) return 'bg-green-500';
      if (val < 70) return 'bg-yellow-500';
      return 'bg-red-500';
    };
  
    return (
      <div className={`w-full ${className}`}>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Risk Level</span>
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${getColor(value)}`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  }