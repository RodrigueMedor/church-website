const API_BASE = process.env.REACT_APP_API_URL || '';

export const createPaymentIntent = async ({ amount, currency, donorEmail, donorName, description }) => {
  const response = await fetch(`${API_BASE}/api/public/donations/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount,
      currency: currency || 'usd',
      donorEmail,
      donorName,
      description: description || 'Online Donation',
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Payment failed' }));
    throw new Error(error.error || error.details || 'Failed to create payment');
  }

  return response.json();
};

export const confirmDonation = async (paymentIntentId) => {
  const response = await fetch(`${API_BASE}/api/public/donations/confirm/${paymentIntentId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Confirmation failed' }));
    throw new Error(error.error || 'Failed to confirm donation');
  }

  return response.json();
};
