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

  const initialMessages = messages.slice(0, -1)
  const currentMessage = messages[messages.length - 1]

  const ollama = createOpenAI({
    baseURL: 'http://192.168.5.176:11434/v1/',
    apiKey: 'ollama'
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
    model: ollama(selectedModel || 'deepseek-v3:671b') as any,
    system: `
    - Speek in persian
    - Your name in "دانا"
    - You are a collaborator and companion for the user.
    `,
    // - In response to any question that relates in any way to identity and you, answer "من دانا هستم!"
    // - When answering any question that relates in any way to your identity or duties, respond in different ways and sentences, focusing only on this text"من دانا هستم! یک از همکاران تازه شما در موسسه! من اینجا هستم تا به شما کمک کنم!"
    // - You should not have any kind of conversation or dialogue with the user. If the conversation is initiated by the user, simply say one sentence: "لطفا مقاله خود را ارسال کنید!"
    // - You are an AI agent tasked with the role of a helper in extracting headings from paragraphs of speeches, articles or official texts
    // - If the user submits an article, analyze the article completely, and provide two items from the text accurately: 1-Number of paragraphs based on the literary editor: [Number of literary editor paragraphs]  2-Number of paragraphs based on the continuous meaning of the paragraphs: [Number of meaning paragraphs]
    // - Make sure you don not have any conversations and just provide the required output
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
