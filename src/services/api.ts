export async function getReport(size = 0.01, withErrors = 'off', maxSpend = '1000') {
  const baseUrl = 'http://localhost:3000/report';
  const params = new URLSearchParams();
  params.append('size', size.toString());
  params.append('withErrors', withErrors);
  params.append('maxSpend', maxSpend);

  const fullUrl = `${baseUrl}?${params.toString()}`;

  return await fetch(fullUrl);
}

export async function aggregate(rows: number, file: File) {
  const baseUrl = 'http://localhost:3000/aggregate';
  const params = new URLSearchParams();
  const formData = new FormData();
  params.append('rows', rows.toString());
  formData.append('file', file);

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Не получилось загрузить файл');
  }

  return response.body;
}
