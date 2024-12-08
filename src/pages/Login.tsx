export default function Login(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Login</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
