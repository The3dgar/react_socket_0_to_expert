import { useContext, useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { SocketContext } from '../context/SocketContext';
import { Band } from './BandList';
Chart.register(...registerables);

export const BandChart = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const {socket} = useContext(SocketContext);

  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on('current-bands', setBands);
    return () => socket.off('current-bands');
  }, [socket]);

  useEffect(() => {
    if(!canvasEl.current) return;
    const ctx = canvasEl.current.getContext('2d') as CanvasRenderingContext2D;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bands.map(band => band.name),
        datasets: [
          {
            label: '# of Votes',
            data: bands.map(band => band.votes),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: {
            stacked: true,
          },
        },
        indexAxis: 'y',
      },
    });

    return () => {
      myChart.destroy();
    }
  }, [bands]);

  return <canvas ref={canvasEl} />;
};
