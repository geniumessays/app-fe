import React from 'react'

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-500/50 z-50">
      <div className="w-24 h-24 border-8 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-white">
        Generating Essay...
      </p>
    </div>
  )
}

export default Spinner
