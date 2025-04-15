const deleteNotification = async (id) => {
  const res = await fetch(`http://localhost:3000/api/notification/${id}`, { // ✅ Fix here
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete notification');
  }

  return await res.json();
};

export default deleteNotification;
