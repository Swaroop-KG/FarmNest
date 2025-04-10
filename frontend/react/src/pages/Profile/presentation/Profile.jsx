import appState from '../../../data/AppState';
import { useRef, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Settings } from 'lucide-react';
import UpdateModal from './UpdateModal';
import Loading from '../../../components/Loading';
import QueryError from '../../../components/QueryError';
import useProfileMutations from '../../../hooks/ProfileHook';

import male from '../../../assets/icons/male.svg';
import './pattern.css';
import { getUser } from '../application/profile';
import getNotifications from '../application/notification';

function Profile() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addFarmImageMutation } = useProfileMutations();

  const [pattern, setPattern] = useState('pattern1');
  const patterns = ['pattern1', 'pattern2', 'pattern3'];

  const {
    data: user,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  });

  const {
    data: notifications,
    isLoading: loadingNotifications,
    isError: errorNotifications,
    error: notificationsError,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    enabled: appState.isFarmer(), // ✅ Hook is always called
  });

  useEffect(() => {
    if (!isLoading && user?._id === undefined) {
      navigate('/auth');
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <main className="min-h-[100vh]">
        <Loading />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-[100vh]">
        <QueryError
          error={error}
          onClick={() => queryClient.invalidateQueries(['profile'])}
        />
      </main>
    );
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      addFarmImageMutation.mutate(selectedFile);
    }
  };

  return (
    <main className="min-h-[100vh]">
      <div className={`mt-[8vh] h-[20vh] w-full ${user?.pattern || pattern}`}></div>
      <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
        <img className="h-[100px] w-[100px]" src={male} alt="" />
      </div>

      {user && <UpdateModal user={user} />}

      <div className="flex justify-end right-10">
        <div className="dropdown md:dropdown-left">
          <label tabIndex={0} className="btn btn-circle btn-ghost btn-md m-4">
            <Settings />
          </label>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={() => {
              const modal = document.getElementById('my_modal_1');
              const handleClose = () => {
                if (modal.returnValue === '1') {
                  modal.removeEventListener('close', handleClose);
                }
              };
              modal.addEventListener('close', handleClose);
              modal.showModal();
            }}>
              <a>Edit Details</a>
            </li>
            <li>
              <a onClick={() => {
                let index = patterns.indexOf(pattern);
                index = (index + 1) % patterns.length;
                setPattern(patterns[index]);
                user.pattern = patterns[index];
                appState.setUserData(user);
              }}>
                Change Pattern
              </a>
            </li>
            <li>
              <a onClick={() => {
                appState.logOutUser();
                queryClient.removeQueries(['profile']);
                queryClient.removeQueries(['cart']);
                queryClient.removeQueries(['explore']);
                queryClient.removeQueries(['items']);
                navigate('/auth');
              }}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section className="flex flex-col items-center">
        {user._id !== undefined ? (
          <>
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <div className="badge badge-accent text-white p-3">
                {user.userType?.toUpperCase() || ''}
              </div>
            </div>
            <h6 className="text-slate-700">{user.email}</h6>
            {user.phone && <h6>{`+91 ${user.phone}`}</h6>}
          </>
        ) : (
          <>
            <h1>Currently not logged in</h1>
            <button
              onClick={() => navigate('/auth')}
              className="bg-lightColor rounded-lg text-white font-semibold text-md py-2 px-10 mt-5"
            >
              Login
            </button>
          </>
        )}
      </section>

      {appState.isCustomer() && <div className="h-[20vh]"></div>}

      {appState.isFarmer() && (
        <>
          <section className="min-h-[40vh] mt-[10vh] mb-[8vh] w-[100%]">
            <h1 className="mb-5 mx-20">Your Farm</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[80vw] mx-20 ">
              {user.images.map((e, i) => (
                <img
                  className="w-full rounded-md hover:scale-[1.025] transition-all duration-500 h-[35vh] object-cover"
                  key={i + e}
                  src={e}
                />
              ))}
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-full bg-slate-100 h-[35vh] rounded-md text-black flex flex-col items-center justify-center hover:scale-[1.025] transition-all duration-500 hover:bg-slate-300"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <p>Add Image</p>
              </div>
            </div>
          </section>

          <section className="mt-[5vh] mb-[10vh] px-[10vw]">
            <h2 className="text-2xl font-bold mb-4">📬 Requests from Consumers</h2>

            {loadingNotifications ? (
              <Loading />
            ) : errorNotifications ? (
              <QueryError error={notificationsError} />
            ) : notifications?.length === 0 ? (
              <p className="text-gray-600">No new requests.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notifications.map((note, idx) => (
                  <div
                    key={idx}
                    className="border p-4 rounded-lg shadow bg-white"
                  >
                    <h3 className="font-semibold text-lg">{note.itemName}</h3>
                    <p className="text-sm text-gray-700">Category: {note.category}</p>
                    <p className="text-sm text-gray-700">Requested by: {note.userName}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(note.date).toLocaleString()}
                    </p>
                    <button
                      className="mt-2 text-green-700 hover:underline"
                      onClick={() => {
                        alert(`You can now add "${note.itemName}" to your items`);
                      }}
                    >
                      ➕ Add to Items
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Profile;
