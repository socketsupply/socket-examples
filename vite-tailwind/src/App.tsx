import { useState } from 'react'
import Link from './components/Link'

function App () {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center bg-blue-950'>
        <h1 className="m-5 text-4xl font-bold text-white">👋 Socket Supply + Vite + React!</h1>

        <button
          className="w-52 m-5 bg-white border-blue-500 border hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => setCount((count) => ++count)}
        >
          count is: {count}
        </button>


        <p className="p-2 text-white">
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>

        <div className="p-2">
          <Link href="https://reactjs.org" text="Learn React" tabIndex={0} />
          {' | '}
          <Link href="https://vitejs.dev/guide/features.html" text="Vite Docs" tabIndex={0} />
          {' | '}
          <Link href="https://tailwindcss.com/docs" text="Tailwind Docs" tabIndex={0} />
        </div>
      </div>
    </>
  )
}

export default App
