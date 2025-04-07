import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import ShopItem from '../../../components/ShopItem';
import ShimmerShopItem from '../../../components/ShimmerShopItem';
import getCart from '../application/cart';
import QueryError from '../../../components/QueryError';

function CartPage() {
  const {
    isLoading,
    isError,
    error,
    data: cartItems
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart()
  });

  const queryClient = useQueryClient();

  const [itemName, setItemName] = useState('');
  const[userName,setUserName]=useState('');
  const [category, setCategory] = useState('Vegetable');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCustomRequest = async () => {
    if (!itemName.trim()) {
      setMessage('⚠️ Please enter an item name.');
      return;
    } if (!userName.trim()) {
      setMessage('⚠️ Please enter an user name.');
      return;
    }


    setLoading(true);
    setMessage('');

    try {
     
      
      const res = await fetch('http://localhost:3000/api/farmer-request', {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName,  userName,category }) // TODO: Replace with actual userId
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        data = {};
      }

      if (res.ok) {
        setMessage(`✅ Request sent for "${itemName}" (${category})`);
        setItemName('');
        setCategory('Vegetable');
      } else {
        setMessage(data.message || '❌ Failed to send request.');
      }
    } catch (err) {
      console.log(err)
      setMessage('❌ Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="md:min-h-screen mt-[14vh] flex flex-col px-[10vw]">
        <h1>Your Cart</h1>
        <div className="h-[3vh]"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8 lg:p-10">
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <ShimmerShopItem key={e} id={e} />
          ))}
        </div>
        <div className="h-[10vh]"></div>
      </section>
    );
  }

  if (isError) {
    return (
      <QueryError
        error={error}
        onClick={() => {
          queryClient.invalidateQueries(['cart']);
        }}
      />
    );
  }

  return (
    <main className="px-[10vw] mt-[15vh]">
      <h1>Your Cart</h1>
      <div className="h-[3vh]"></div>

      <section className="min-h-screen flex flex-col">
        {cartItems && cartItems.length === 0 && (
          <div className="h-[75vh] w-full flex flex-col gap-10 justify-center items-center">
            <h1 className="text-8xl">🍉</h1>
            <h2>No Items in cart</h2>
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cartItems &&
            cartItems.map((e, i) => (
              <ShopItem
                key={i}
                itemId={e.item}
                itemCount={e.count}
                isCart={true}
                onDelete={(item) => {
                  queryClient.setQueryData(['cart'], (prevData) =>
                    prevData.filter((i) => i.item !== item._id)
                  );
                }}
              />
            ))}
        </div>

        {/* 🟢 Requesting Farmer Section */}
        <div className="mt-16 border rounded p-6 shadow max-w-md mx-auto bg-white">
          <h2 className="text-xl font-bold mb-4">📩 Requesting Farmer</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter item name (e.g. Tomato)"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
            type="text"
            placeholder="Enter username "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2 rounded"
          />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Plant Sapling">Plant Sapling</option>
            </select>

            <button
              onClick={handleCustomRequest}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Sending...' : '➕ Request Item'}
            </button>

            {message && (
              <p className="text-sm text-center mt-2">{message}</p>
            )}
          </div>
        </div>

        <div className="h-[10vh]"></div>
      </section>
    </main>
  );
}

export default CartPage;
