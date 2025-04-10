export default async function sendCustomerMessage({ userId, message, date }) {
    const res = await fetch(`/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message, date }),
    });
  
    if (!res.ok) {
      throw new Error('Failed to send message to customer');
    }
  
    return await res.json();
  }