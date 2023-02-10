export default function Navbar() {
    return (
        <div className="flex items-center justify-start bg-gray-800 p-3 space-x-3">
            <a href="/">
                <div className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                    Hello!
                </div>
            </a>
            <a href="/deregister">
                <div className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                    I
                </div>
            </a>
            <a href="/">
                <div className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                    am
                </div>
            </a>
            <a href="/">
                <div className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded">
                    Groot!
                </div>
            </a>
        </div>
    )
}