'use client'

import { useState } from 'react'

type Platform = 'linkedin' | 'twitter' | 'instagram'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin')
  const [generatedPost, setGeneratedPost] = useState('')
  const [copied, setCopied] = useState(false)

  const formatPost = (text: string, platform: Platform): string => {
    if (!text.trim()) return ''

    switch (platform) {
      case 'linkedin':
        return `🚀 ${text}

#professional #linkedin #networking #career`

      case 'twitter':
        const twitterText = text.length > 240 ? text.substring(0, 237) + '...' : text
        return `${twitterText}

#twitter #social`

      case 'instagram':
        return `✨ ${text} ✨

#instagram #social #lifestyle #inspiration #photooftheday`

      default:
        return text
    }
  }

  const handleGenerate = () => {
    const formatted = formatPost(inputText, selectedPlatform)
    setGeneratedPost(formatted)
    setCopied(false)
  }

  const handleCopy = async () => {
    if (generatedPost) {
      try {
        await navigator.clipboard.writeText(generatedPost)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Social Media Post Generator</h1>
          <p className="text-gray-600">Create perfectly formatted posts for different social platforms</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to post?
              </label>
              <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your message here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                Select Platform
              </label>
              <select
                id="platform"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
              </select>

              <button
                onClick={handleGenerate}
                disabled={!inputText.trim()}
                className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Generate Post
              </button>
            </div>
          </div>
        </div>

        {generatedPost && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Generated Post for {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</h2>
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-md transition-colors ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
              <pre className="whitespace-pre-wrap text-gray-800 font-medium">{generatedPost}</pre>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>Character count: {generatedPost.length}</p>
              {selectedPlatform === 'twitter' && generatedPost.length > 280 && (
                <p className="text-red-500">⚠️ Post exceeds Twitter's 280 character limit</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Guidelines</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-medium text-blue-600 mb-2">LinkedIn</h4>
              <p className="text-sm text-gray-600">Professional tone, industry hashtags, networking focus</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-medium text-blue-400 mb-2">Twitter</h4>
              <p className="text-sm text-gray-600">Concise, 280 character limit, trending hashtags</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-medium text-pink-500 mb-2">Instagram</h4>
              <p className="text-sm text-gray-600">Visual appeal, lifestyle hashtags, engaging emojis</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}