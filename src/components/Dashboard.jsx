import Weather from "./Weather"
import ToDo from "./ToDo"
import News from "./News"

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Ruang.</h1>
                <button className="px-3 py-2 bg-gray-300 rounded-lg text-sm hover:bg-gray-400 cursor-pointer select-none">+ Add Widget</button>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Weather />
                <ToDo />
                <News />
            </div>
        </div>
    )
} 

