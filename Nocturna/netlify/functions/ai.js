{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 exports.handler = async (event) => \{\
  if (event.httpMethod !== 'POST') return \{ statusCode: 405 \};\
\
  const \{ prompt, system \} = JSON.parse(event.body);\
\
  const response = await fetch('https://api.anthropic.com/v1/messages', \{\
    method: 'POST',\
    headers: \{\
      'Content-Type': 'application/json',\
      'x-api-key': process.env.ANTHROPIC_API_KEY,\
      'anthropic-version': '2023-06-01'\
    \},\
    body: JSON.stringify(\{\
      model: 'claude-sonnet-4-20250514',\
      max_tokens: 1000,\
      system: system || 'You are an expert study assistant. Be concise and clear.',\
      messages: [\{ role: 'user', content: prompt \}]\
    \})\
  \});\
\
  const data = await response.json();\
  return \{\
    statusCode: 200,\
    body: JSON.stringify(\{ text: data.content?.[0]?.text || '' \})\
  \};\
\};}