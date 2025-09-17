import React from "react"
import { useSelector, useDispatch } from "react-redux"


export default function Counter() {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
    
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl">Count: {count}</h2>
      <div className="flex space-x-4">
        <button
          className="bg-red-950 text-slate-50 text-xl px-4 py-2 rounded-lg"
          onClick={() => dispatch({ type: "Increment" })}
        >
          Increment +
        </button>
        <button
          className="bg-green-900 text-slate-50 text-xl px-4 py-2 rounded-lg"
          onClick={() => dispatch({ type: "Decrement" })}
        >
          Decrement -
        </button>
      </div>
    </div>
  )
}
