import { useState } from 'react'

interface FormData {
  topic: string
  exampleText: string
  wordCount: number
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    exampleText: '',
    wordCount: 0,
  })
  const [output, setOutput] = useState<string>('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'wordCount' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Call API (replace with your endpoint)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    setOutput(data.result)
  }

  return (
    <div>
      <h1 className="text-4xl text-center">GENIUM ESSAYS</h1>
      <div className="flex min-h-screen p-8">
        {/* Form Section */}
        <div className="w-1/2 p-4 border-r">
          <h1 className="text-xl font-bold mb-4">Essay Generator</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Enter topic"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="exampleText"
              value={formData.exampleText}
              onChange={handleChange}
              placeholder="Enter example text"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="wordCount"
              value={formData.wordCount}
              onChange={handleChange}
              placeholder="Word count"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Generate
            </button>
          </form>
        </div>

        {/* Output Section */}
        <div className="w-1/2 p-4">
          <h2 className="text-lg font-bold mb-2">Generated Essay:</h2>
          <p className="border p-2 rounded">
            {output || 'Your essay will appear here...'}
          </p>
        </div>
      </div>
    </div>
  )
}
