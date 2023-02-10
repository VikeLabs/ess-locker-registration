export default function Navbar() {
    return (
        <div className="flex items-center justify-start bg-gray-800 p-3 space-x-3">
            <a href="/" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                Hello!
            </a>
            <a href="/deregister" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                I
            </a>
            <a href="/" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                am
            </a>
            <a href="/" className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                Groot!
            </a>
        </div>
    )
}