import { createOpenAI } from '@ai-sdk/openai'
import { streamText, convertToCoreMessages, CoreMessage, UserContent, tool } from 'ai'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const { messages, selectedModel, data, systemPrompt } = await req.json()

  const initialMessages = messages.slice(0, -1)
  const currentMessage = messages[messages.length - 1]

  const ollama = createOpenAI({
    baseURL: process.env.NEXT_PUBLIC_OLLAMA_URL,
    apiKey: process.env.NEXT_PUBLIC_OLLAMA_KEY
  })
  // const ollama = createOpenAI({
  //   baseURL: 'https://api.studio.nebius.ai/v1/',
  //   apiKey:
  //     'eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnaXRodWJ8MTIxMzEzMTIwIiwic2NvcGUiOiJvcGVuaWQgb2ZmbGluZV9hY2Nlc3MiLCJpc3MiOiJhcGlfa2V5X2lzc3VlciIsImF1ZCI6WyJodHRwczovL25lYml1cy1pbmZlcmVuY2UuZXUuYXV0aDAuY29tL2FwaS92Mi8iXSwiZXhwIjoxODk2MTk2NTA1LCJ1dWlkIjoiZDRmMWZlNzUtODM2Mi00YWZjLTg0MmYtOTBhOGMxNGFmZWYyIiwibmFtZSI6InRlc3QgYWkiLCJleHBpcmVzX2F0IjoiMjAzMC0wMi0wMVQxNzoxNTowNSswMDAwIn0.FGnpKCoegvQ5Ecmh321377iE9ZcvnvjGnTHc5nfrtyc'
  // })

  // Build message content array directly
  const messageContent: UserContent = [{ type: 'text', text: currentMessage.content }]

  // Add images if they exist
  data?.images?.forEach((imageUrl: string) => {
    const image = new URL(imageUrl)
    messageContent.push({ type: 'image', image })
  })

  // Stream text using the ollama model
  const result = await streamText({
    model: ollama(selectedModel || 'meta-llama/Llama-3.3-70B-Instruct') as any,
    system: `
    - Speek in persian
    - Your name in "دانا"
    - You are a collaborator and companion for the user.
    `,
    messages: [...convertToCoreMessages(initialMessages), { role: 'user', content: messageContent }]
  })

  return result.toDataStreamResponse()
}
