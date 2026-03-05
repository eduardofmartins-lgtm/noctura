{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13240\viewh7820\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const Stripe = require('stripe');\
\
exports.handler = async (event) => \{\
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);\
\
  try \{\
    const session = await stripe.checkout.sessions.create(\{\
      mode: 'subscription',\
      payment_method_types: ['card'],\
      line_items: [\{\
        price: process.env.STRIPE_PRICE_ID,\
        quantity: 1,\
      \}],\
      subscription_data: \{\
        trial_period_days: 3,\
      \},\
      success_url: `$\{process.env.URL\}/success.html`,\
      cancel_url: `$\{process.env.URL\}/`,\
    \});\
\
    return \{\
      statusCode: 200,\
      body: JSON.stringify(\{ url: session.url \}),\
    \};\
  \} catch (err) \{\
    return \{\
      statusCode: 500,\
      body: JSON.stringify(\{ error: err.message \}),\
    \};\
  \}\
\};\
}