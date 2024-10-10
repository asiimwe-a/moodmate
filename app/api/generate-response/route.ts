import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  const { mood } = await request.json()

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a supportive AI assistant. The user will provide their current mood, and you should respond with empathy and offer appropriate advice or encouragement."
        },
        {
          role: "user",
          content: `My current mood is: ${mood}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}