// frontend/src/components/BreachTimeline.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BreachTimelineProps {
  breaches: Date[];
}

export default function BreachTimeline({ breaches }: BreachTimelineProps) {
  const data = {
    labels: breaches.map(d => d.toLocaleDateString()),
    datasets: [{
      label: 'Breach Events',
      data: breaches.map(() => 0.2),
      borderColor: 'rgb(68, 128, 239)',
      backgroundColor: 'rgba(233, 58, 27, 0.5)',
      tension: 0.1,
      pointRadius: 6
    }]
  };

  return <Line data={data} />;
}