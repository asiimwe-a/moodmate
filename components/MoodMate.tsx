'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function MoodMate() {
    const [mood, setMood] = useState('')
    const [response, setResponse] = useState('')
    const [journalEntry, setJournalEntry] = useState('')
    const [isLoading, setIsLoading] = useState(false)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
  
      try {
        const res = await fetch('/api/generate-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mood }),
        })
  
        if (!res.ok) {
          throw new Error('Failed to generate response')
        }
  
        const data = await res.json()
        setResponse(data.response)
      } catch (error) {
        console.error('Error:', error)
        setResponse('Sorry, there was an error generating a response. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">MoodMate</CardTitle>
            <CardDescription>Your AI companion for emotional well-being</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
                  How are you feeling today?
                </label>
                <Input
                  type="text"
                  id="mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="Enter your mood..."
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Thinking...' : 'Get Advice'}
              </Button>
            </form>
  
            {response && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">MoodMate's Response:</h3>
                <p className="mt-2 text-gray-600">{response}</p>
              </div>
            )}
  
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Journal Your Thoughts</h3>
              <Textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Reflect on your feelings and experiences..."
                rows={4}
                className="mt-2 w-full"
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              MoodMate uses AI to provide personalized responses. Always seek professional help for serious concerns.
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }