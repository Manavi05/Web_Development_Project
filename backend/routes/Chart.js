const downloadChart = () => {
  const chartCanvas = document.querySelector('canvas');
  const url = chartCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chart.png';
  a.click();
};
