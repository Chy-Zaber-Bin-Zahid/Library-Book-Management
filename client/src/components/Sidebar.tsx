import { BarChart3, Users } from "lucide-react"

function Sidebar() {
  return (
          <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">BookWise</span>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Users className="w-5 h-5" />
            <span>Books</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Users className="w-5 h-5" />
            <span>Members</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
            <Users className="w-5 h-5" />
            <span>Reports</span>
          </div>
        </nav>
      </div>
  )
}

export default Sidebar