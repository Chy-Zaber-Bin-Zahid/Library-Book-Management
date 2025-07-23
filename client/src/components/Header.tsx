import { Bell, Search } from "lucide-react"

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Librarian!</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        </div>
        </div>
    </header>
  )
}

export default Header