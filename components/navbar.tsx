export default function Navbar() {
  return (
    <div className="flex items-center justify-start bg-gray-800 px-3 py-2 space-x-3">
      <a href="/" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Home
      </a>
      <a href="/deregister?building=ECS&number=100" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Deregister
      </a>
      <a href="/register?building=ECS&number=100" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Register
      </a>
      <a href="/registration_complete?building=ECS&number=100" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Registration Complete
      </a>
      <a href="/deregistration_complete?building=ECS&number=100" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Deregistration Complete
      </a>
      <a href="/report_complete?building=ECS&number=100" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Report Complete
      </a>
      <a href="/notfound" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Not Found
      </a>
      <a href="/contact" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Contact
      </a>
      <a href="/report" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
        Report
      </a>
    </div>
  )
}