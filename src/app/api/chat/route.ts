import { createOpenAI } from '@ai-sdk/openai'
// import { createOllama } from 'ollama-ai-provider'
import { streamText, convertToCoreMessages, CoreMessage, UserContent, tool } from 'ai'
import { z } from 'zod'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Destructure request data
  const { messages, selectedModel, data, systemPrompt } = await req.json()
  // console.log({ messages, selectedModel, data })
  const ollamaUrl = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://192.168.100.29:11434'

  const initialMessages = messages.slice(0, -1)
  const currentMessage = messages[messages.length - 1]
  console.log('selectedModel', selectedModel)
  console.log('systemPrompt', systemPrompt)

  const ollama = createOpenAI({
    baseURL: 'https://api.studio.nebius.ai/v1/',
    apiKey:
      'eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnaXRodWJ8MTIxMzEzMTIwIiwic2NvcGUiOiJvcGVuaWQgb2ZmbGluZV9hY2Nlc3MiLCJpc3MiOiJhcGlfa2V5X2lzc3VlciIsImF1ZCI6WyJodHRwczovL25lYml1cy1pbmZlcmVuY2UuZXUuYXV0aDAuY29tL2FwaS92Mi8iXSwiZXhwIjoxODk2MTk2NTA1LCJ1dWlkIjoiZDRmMWZlNzUtODM2Mi00YWZjLTg0MmYtOTBhOGMxNGFmZWYyIiwibmFtZSI6InRlc3QgYWkiLCJleHBpcmVzX2F0IjoiMjAzMC0wMi0wMVQxNzoxNTowNSswMDAwIn0.FGnpKCoegvQ5Ecmh321377iE9ZcvnvjGnTHc5nfrtyc'
  })

  // Build message content array directly
  const messageContent: UserContent = [{ type: 'text', text: currentMessage.content }]

  // Add images if they exist
  data?.images?.forEach((imageUrl: string) => {
    const image = new URL(imageUrl)
    messageContent.push({ type: 'image', image })
  })

  // Stream text using the ollama model
  const result = await streamText({
    model: ollama('meta-llama/Llama-3.3-70B-Instruct') as any,
    system: `
    - Speek in persian
    You are an AI agent tasked with generating intelligent subtitles for paragraphs extracted from speeches, articles, or formal texts. Your goal is to analyze the content of each paragraph and produce concise, relevant, and precise subtitles that encapsulate the main idea.

      Instructions:
      1. Analyze the Paragraph: Read the provided paragraph carefully. Identify the main theme and key concepts within the text.
      2. Generate Subtitle: Create a subtitle that is concise, relevant, and descriptive for each paragraph.
      3. Return the Original Text: Provide the original text without any modifications or alterations.
      4. Format the Output: For each paragraph, return it in the following format:
         - Subtitle: [Generated Subtitle]
         - Text: [Original Text]
    `,
    // tools: {
    //   weather: tool({
    //     description: 'Get the weather in a location',
    //     parameters: z.object({
    //       location: z.string().describe('The location to get the weather for')
    //     }),
    //     execute: async ({ location }) => ({
    //       location,
    //       temperature: 72 + Math.floor(Math.random() * 21) - 10
    //     })
    //   })
    // },
    // prompt: 'What is the weather in San Francisco?'
    messages: [
      // ...(systemPrompt ? systemPrompt : []),
      // I need to write another system prompt in there with get from request
      ...convertToCoreMessages(initialMessages),
      // { role: 'system', content: 'Speak in Persian' },
      { role: 'user', content: messageContent }
    ]
  })

  return result.toDataStreamResponse()
}
