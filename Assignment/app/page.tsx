'use client'

import React, { useState } from 'react'

export default function HomePage() {
  const [tabs, setTabs] = useState<{ title: string; content: string }[]>([
    { title: 'Tab 1', content: 'Content for Tab 1' },
  ])
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [clearAfterGenerate, setClearAfterGenerate] = useState<boolean>(false)

  const addTab = () => {
    if (tabs.length < 15) {
      setTabs([
        ...tabs,
        { title: `Tab ${tabs.length + 1}`, content: `Content for Tab ${tabs.length + 1}` },
      ])
    }
  }

  const removeTab = (index: number) => {
    setTabs(tabs.filter((_, i) => i !== index))
  }

  const updateTab = (index: number, field: 'title' | 'content', value: string) => {
    const newTabs = [...tabs]
    newTabs[index][field] = value
    setTabs(newTabs)
  }

  const generateCode = () => {
    const buttons = tabs
      .map(
        (tab, i) =>
          `<button onclick="showTab(${i})" style="padding:0.5rem 1rem;margin:0 5px;border:none;background:#6366f1;color:#fff;border-radius:6px;cursor:pointer;">${tab.title}</button>`
      )
      .join('\n')

    const contents = tabs
      .map(
        (tab, i) =>
          `<div class="tab-content" style="display:${i === 0 ? 'block' : 'none'};padding:1rem;border:1px solid #ddd;margin-top:10px;border-radius:8px;">
  ${tab.content}
</div>`
      )
      .join('\n')

    const script = `
<script>
window.showTab = function(index) {
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach((c, i) => {
    c.style.display = i === index ? 'block' : 'none';
  });
}
</script>`

    const fullCode = `
<div class="tabs" style="margin-bottom:1rem;">
  ${buttons}
</div>

${contents}

${script}
    `

    setGeneratedCode(fullCode.trim())

    if (clearAfterGenerate) {
      setTabs([])
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('✅ Code copied to clipboard!')
  }

  const downloadHTML = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'tabs.html'
    link.click()
  }

  return (
    <main className="p-6 font-sans bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">🎨 Tab Generator</h1>

      <button
        onClick={addTab}
        disabled={tabs.length >= 15}
        className={`px-4 py-2 mb-4 rounded-md font-medium text-white shadow-md transition
          ${tabs.length >= 15 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90'}
        `}
      >
        + Add Tab ({tabs.length}/15)
      </button>

      {tabs.map((tab, i) => (
        <div
          key={i}
          className="flex flex-wrap gap-2 items-center mb-3 bg-white p-3 rounded-xl shadow-sm border border-gray-200"
        >
          <input
            type="text"
            value={tab.title}
            onChange={(e) => updateTab(i, 'title', e.target.value)}
            placeholder="Tab name"
            className="px-3 py-2 w-40 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="text"
            value={tab.content}
            onChange={(e) => updateTab(i, 'content', e.target.value)}
            placeholder="Tab content"
            className="px-3 py-2 flex-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <button
            onClick={() => removeTab(i)}
            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <label className="flex items-center gap-2 mt-2 text-gray-700">
        <input
          type="checkbox"
          checked={clearAfterGenerate}
          onChange={(e) => setClearAfterGenerate(e.target.checked)}
          className="w-4 h-4 text-indigo-600"
        />
        Clear tabs after generate
      </label>

      <button
        onClick={generateCode}
        className="mt-4 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow-md hover:opacity-90 transition"
      >
        ⚙️ Generate Code
      </button>

      {generatedCode && (
        <>
          <h2 className="mt-8 text-xl font-semibold text-indigo-700">Generated Code:</h2>
          <textarea
            readOnly
            value={generatedCode}
            rows={Math.min(20, generatedCode.split('\n').length)}
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg font-mono text-sm bg-white shadow-inner"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={copyCode}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
            >
              📋 Copy Code
            </button>
            <button
              onClick={downloadHTML}
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition"
            >
              💾 Download .html
            </button>
          </div>
        </>
      )}
    </main>
  )
}
