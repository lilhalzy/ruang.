import { useEffect, useState } from "react"

const CurrencyExchange = () => {
    const [rates, setRates] = useState({})
    const [asOf, setAsOf] = useState("")
    const [loading, setLoading] = useState(true)   
    useEffect(() => {
      async function fetchRates() {
        try {
          setLoading(true) 
          const currencies = ["USD", "SGD", "GBP", "JPY", "CNY"]
          const results = {};
          for (const cur of currencies) {
            const res = await fetch(
              `https://api.frankfurter.app/latest?from=${cur}&to=MYR`
            );
            const data = await res.json()
            results[cur] = data.rates.MYR
            setAsOf(data.date)
          } 
          setRates(results)
        } catch (err) {
          console.error("Error fetching currency rates:", err)
        } finally {
          setLoading(false)
        }
      } 
      fetchRates()
    }, []);
    const currencies = [
      { code: "USD", flag: "🇺🇸" },
      { code: "SGD", flag: "🇸🇬" },
      { code: "GBP", flag: "🇬🇧" },
      { code: "CNY", flag: "🇨🇳" },
      { code: "JPY", flag: "🇯🇵" },
    ] 
    return (
      <div className="bg-gradient-to-br from-blue-50 to-green-100 rounded-xl shadow-lg p-5 border border-blue-200">
        <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-3">Currency to MYR</h2>
            <p className="text-xs text-gray-500 mt-1">As of {asOf}</p>
        </div>
        {loading ? (
            <div className="flex justify-center items-center py-6 space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
        ) : (
            <div className="grid gap-2">
              {currencies.map(({ code, flag }) => (
                <div
                  key={code}
                  className="flex justify-between items-center p-3 rounded-lg shadow bg-white"
                >
                  <span>
                    {flag} {code} → 🇲🇾 MYR
                  </span>
                  <span className="font-bold text-blue-800">RM {rates[code]?.toFixed(2)}</span>
                </div>
              ))}
            </div>  
        )}  
      </div>
    )
}

export default CurrencyExchange