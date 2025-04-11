import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white flex flex-col justify-between">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold">PayMate</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-bold mb-4">Welcome to PayMate</h2>
        <p className="text-lg mb-14">Make payments seamlessly.</p>
       

        <div className="space-x-4">
          <Link to="/signup">
            <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md text-lg">Create a New Account</button>
          </Link>
          <Link to="/signin">
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md text-lg">Log Into Your Account</button>
          </Link>
        </div>
      </main>

     
    </div>
  );
};
