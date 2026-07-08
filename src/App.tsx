import { useEffect, useState } from 'react'
import type { Pizza } from './types'

const API_URL = 'http://localhost:8080/api/pizzas'

export function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json() as Promise<Pizza[]>
      })
      .then((data) => setPizzas(data))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Something went wrong'),
      )
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">🍕 Pizza Menu</h1>
          <p className="mt-2 text-slate-500">Our available pizzas</p>
        </header>

        {loading && <p className="text-center text-slate-500">Loading…</p>}

        {error && (
          <p className="text-center font-medium text-red-600">
            Could not load pizzas: {error}
          </p>
        )}

        {!loading && !error && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pizzas.map((pizza) => (
              <li
                key={pizza.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-baseline justify-between">
                  <h2 className="text-xl font-semibold">{pizza.name}</h2>
                  <span className="font-mono text-lg text-emerald-600">
                    €{pizza.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{pizza.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
