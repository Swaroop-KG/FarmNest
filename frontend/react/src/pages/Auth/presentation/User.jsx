import { useNavigate } from 'react-router-dom';
import appState from '../../../data/AppState';
import { toast } from 'react-toastify';
import bg from '../../../assets/bg.jpg';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
   
  
    if (!isLoggedIn) {
      toast.error("Please log in first! 🔐");
      return;
    }
  
    if (role === "Farmer") {
      appState.isFarmer()
        ? navigate("/profile")
        : toast.error("Wrong input! You are a customer 😥");
    } else if (role === "Customer") {
      appState.isCustomer()
        ? navigate("/shop")
        : toast.error("Wrong input! You are a farmer 😥");
    }
  };
  

  return (
    <div
  className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
  style={{ backgroundImage: `url(${bg})` }}
>
      <h1 className="text-5xl md:text-5xl font-bold text-black drop-shadow-md">WELCOME TO</h1>
      <h2 className="text-5xl md:text-6xl font-bold text-black drop-shadow-lg mt-2">FARMNEST</h2>
      <p className="text-2xl md:text-3xl font-semibold text-black mt-6">ARE YOU A</p>

      <div className="flex gap-10 mt-6">
        <button
          onClick={() => handleLogin("Farmer")}
          className="border-4 border-black px-8 py-3 text-xl font-bold text-black hover:bg-black hover:text-white transition duration-300 rounded-full"
        >
          FARMER
        </button>
        <button
          onClick={() => handleLogin("Customer")}
          className="border-4 border-black px-8 py-3 text-xl font-bold text-black hover:bg-black hover:text-white transition duration-300 rounded-full"
        >
          Customer
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
