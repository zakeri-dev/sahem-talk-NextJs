import React, { useState } from 'react'

const SubtitleGenerator = () => {
  const [paragraph, setParagraph] = useState('')
  const [subtitles, setSubtitles] = useState([])

  const handleInputChange = event => {
    setParagraph(event.target.value)
  }

  const generateSubtitles = async () => {
    const prompt = `
      You are an AI agent tasked with generating intelligent subtitles for paragraphs extracted from speeches, articles, or formal texts. Your goal is to analyze the content of each paragraph and produce concise, relevant, and precise subtitles that encapsulate the main idea.

      Instructions:
      1. Analyze the Paragraph: Read the provided paragraph carefully. Identify the main theme and key concepts within the text.
      2. Generate Subtitle: Create a subtitle that is concise, relevant, and descriptive.
      3. Contextual Understanding: Take into account the tone and style of the original text.
      4. Learning from Previous Data: Utilize patterns and examples from previously indexed speeches and documents.
      5. User Interaction: Present multiple subtitle options when possible.

      Example Input: "${paragraph}"
      Expected Output:`

    const requestBody = {
      role: 'system',
      content: prompt
    }

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setSubtitles(data.subtitles) // فرض بر این است که پاسخ شامل زیرعنوان‌ها است
    } catch (error) {
      console.error('Error generating subtitles:', error)
    }
  }

  return (
    <div>
      <h1>Intelligent Subtitle Generator</h1>
      <textarea value={paragraph} onChange={handleInputChange} placeholder='Enter your paragraph here' />
      <button onClick={generateSubtitles}>Generate Subtitles</button>
      <h2>Generated Subtitles:</h2>
      <ul>
        {subtitles.map((subtitle, index) => (
          <li key={index}>{subtitle}</li>
        ))}
      </ul>
    </div>
  )
}

export default SubtitleGenerator
