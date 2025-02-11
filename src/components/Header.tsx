export default function Header() {
    return (
      <header className="w-full flex justify-between items-center p-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          🚀 Terra AI
        </h1>
        <button className="flex items-center gap-2 border p-2 rounded shadow">
          Se connecter avec Google
        </button>
      </header>
    );
  }