export default async function getNotifications() {
    const res = await fetch('http://localhost:3000/api/farmer-request');
    if (!res.ok) {
      throw new Error('Failed to fetch notifications');
    }
    return res.json();
  }

  export  async function deleteNotification(id) {
    const res = await fetch(`/api/notification/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      throw new Error('Failed to delete notification');
    }
  
    return await res.json();
  }
  export const updateNotificationStatus = async (id, status) => {
    try {
      const res = await axios.patch(`/api/notifications/${id}`, { status });
      return res.data;
    } catch (err) {
      console.error('Failed to update notification:', err);
      throw err;
    }
  };