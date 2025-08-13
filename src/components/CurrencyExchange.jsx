import { useEffect,useState } from "react"

const CurrencyExchange = () => {
    const [rates, setRates] = useState({})
    const [loading, setLoading]  = useState(true)
    const [error, setError] = useState(null)
    const [asOf, setAsOf] = useState("")

    const STORAGE_KEY = "fx_usd_sgd_gbp_myr_v1"


    useEffect(() => {
        async function fetchRates() {
          try {
            setLoading(true)
            setError(null)    
            const currencies = ["USD", "SGD", "GBP"]
            const promises = currencies.map((cur) =>
              fetch(`https://api.frankfurter.app/latest?from=${cur}&to=MYR`).then(
                (res) => res.json()
              )
            ) 
            const results = await Promise.all(promises)   
            const mappedRates = {}
            results.forEach((data) => {
              if (data?.base && data?.rates?.MYR) {
                mappedRates[data.base] = data.rates.MYR
                setAsOf(data.date)
              }
            })    
            setRates(mappedRates)
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ rates: mappedRates, date: asOf })
            )
          } catch (err) {
            const cached = localStorage.getItem(STORAGE_KEY)
            if (cached) {
              const parsed = JSON.parse(cached)
              setRates(parsed.rates || {})
              setAsOf(parsed.date || "")
              setError("Showing cached rates (offline).")
            } else {
              setError(err.message)
            }
          } finally {
            setLoading(false)
          }
        }
        fetchRates()
    }, [])

  return (
    <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">MYR Exhange</h2>
        
        {loading && (
            <div className="flex justify-center items-center py-6 space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
            <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                    <span>1 MYR → USD</span>
                    <span className="font-medium">RM {rates.USD?.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                    <span>1 MYR → SGD</span>
                    <span className="font-medium">RM {rates.SGD?.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                    <span>1 MYR → GBP</span>
                    <span className="font-medium">RM {rates.GBP?.toFixed(2)}</span>
                </li>
            </ul>
        )}
    </div>
  )
}

export default CurrencyExchange