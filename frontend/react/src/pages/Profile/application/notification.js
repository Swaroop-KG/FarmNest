export default async function getNotifications() {
    const res = await fetch('http://localhost:3000/api/farmer-request');
    if (!res.ok) {
      throw new Error('Failed to fetch notifications');
    }
    return res.json();
  }