import React, { useState } from 'react'
import Spinner from './components/Spinner'

import { SERVER_DOMAIN } from './assets/constants'

const App: React.FC = () => {
  const [topic, setTopic] = useState('')
  const [exampleText, setExampleText] = useState('')
  const [wordCount, setWordCount] = useState(500)
  const [output, setOutput] = useState('')

  const [spinner, setSpinner] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSpinner(true)
    try {
      const response = await fetch(`${SERVER_DOMAIN}/generate-essay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          exampleText: exampleText,
          wordCount: wordCount,
        }),
      })
      if (!response.ok) {
        throw new Error('The response from the server was not ok')
      }
      const data = await response.json()
      setSpinner(false)
      setOutput(data.response)
    } catch (error) {
      console.error('There was a problem with the fetch operation', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      {spinner && <Spinner />}
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          GENIUM ESSAYS - Playground
        </h1>

        {/* Responsive Layout: Form and Output */}
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full sm:w-1/2"
          >
            <div>
              <label
                htmlFor="topic"
                className="block text-lg font-medium text-gray-700"
              >
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="exampleText"
                className="block text-lg font-medium text-gray-700"
              >
                Example Text
              </label>
              <textarea
                id="exampleText"
                value={exampleText}
                onChange={(e) => setExampleText(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                required
              />
            </div>
            <div>
              <label
                htmlFor="wordCount"
                className="block text-lg font-medium text-gray-700"
              >
                Word Count
              </label>
              <input
                type="number"
                id="wordCount"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-[150px] h-[50px] text-base bg-[#1a1a1a] text-white border-2 border-white cursor-pointer rounded-[10px] transition-all duration-300 hover:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Generate Essay
            </button>
          </form>

          {/* Output Section */}
          <div className="w-full sm:w-1/2 flex flex-col justify-between">
            <div className="h-full flex flex-col justify-center items-start p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generated Essay
              </h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm w-full h-full overflow-y-auto">
                <p className="text-gray-800">
                  {output || 'Your generated essay will appear here.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTopic('')
                  setExampleText('')
                  setWordCount(500) // Default word count
                  setOutput('')
                }}
                className="w-[150px] h-[70px] text-base bg-[#1a1a1a] text-white border-2 border-white cursor-pointer rounded-[10px] transition-all duration-300 hover:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
