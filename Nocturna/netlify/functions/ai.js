exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const { prompt, system } = JSON.parse(event.body);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: system || 'You are an expert study assistant. Be concise and clear.',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ text: data.content?.[0]?.text || '' })
  };
};
