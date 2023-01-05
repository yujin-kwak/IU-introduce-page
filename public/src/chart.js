/************그래픽 차트 기능************/
const ctx = document.getElementById('UAENA_Chart');

const data = {
  labels: ['1기', '2기', '3기', '4기', '5기'],
  datasets: [
    {
      barPercentage: 0.6,
      base: 0,
      label: '기수별 인원',
      data: [10557, 18600, 30500, 50301, 45200],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      hoverBackgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ],
      borderRadius: 8,
      borderWidth: 2,
    },
  ],
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: false,
  },
};

new Chart(ctx, config);
