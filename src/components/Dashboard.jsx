export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Ruang.</h1>
                <button className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer">+ add widget</button>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">Widget title</h2>
                    <p className="text-gray-500 text-sm">widget content goes here</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">Widget title</h2>
                    <p className="text-gray-500 text-sm">widget content goes here</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">Widget title</h2>
                    <p className="text-gray-500 text-sm">widget content goes here</p>
                </div>
            </div>
        </div>
    )
} 

