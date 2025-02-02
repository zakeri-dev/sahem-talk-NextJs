import { createOllama } from 'ollama-ai-provider'
import { streamText, convertToCoreMessages, CoreMessage, UserContent } from 'ai'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Destructure request data
  const { messages, selectedModel, data } = await req.json()
  console.log({ messages, selectedModel, data })
  const ollamaUrl = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434'

  const initialMessages = messages.slice(0, -1)
  const currentMessage = messages[messages.length - 1]
  console.log(convertToCoreMessages(initialMessages))

  const ollama = createOllama({ baseURL: ollamaUrl + '/api' })

  // Build message content array directly
  const messageContent: UserContent = [{ type: 'text', text: currentMessage.content }]

  // Add images if they exist
  data?.images?.forEach((imageUrl: string) => {
    const image = new URL(imageUrl)
    messageContent.push({ type: 'image', image })
  })

  // Stream text using the ollama model
  const result = await streamText({
    model: ollama(selectedModel),
    messages: [
      { role: 'system', content: 'Speek in persian' },
      // { role: "system", content: "You are a helpful developer assistant." },
      ...convertToCoreMessages(initialMessages),
      { role: 'user', content: messageContent }
    ]
  })

  return result.toDataStreamResponse()
}
