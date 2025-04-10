export  default async function deleteNotification(id) {
    const res = await fetch(`/api/notification/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      throw new Error('Failed to delete notification');
    }
  
    return await res.json();
  }

 
  