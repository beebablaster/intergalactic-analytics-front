export async function getReports(size: number, withErrors = 'off', maxSpend = '1000') {
  const baseUrl = 'http://localhost:3000/report';
  const params = new URLSearchParams();
  params.append('size', size.toString());
  params.append('withErrors', withErrors);
  params.append('maxSpend', maxSpend);

  const fullUrl = `${baseUrl}?${params.toString()}`;

  return await fetch(fullUrl);
}

export async function aggregate() {
  return (await fetch('http://localhost:3000/aggregate', { method: 'POST' })).json();
}
