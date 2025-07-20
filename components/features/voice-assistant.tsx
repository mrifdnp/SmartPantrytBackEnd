"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mic, MicOff, Volume2, VolumeX, Sparkles, MessageSquare } from "lucide-react"

const voiceCommands = [
  { command: "Tambah tomat 2 kilo", action: "add_item", confidence: 95 },
  { command: "Berapa stok beras?", action: "check_stock", confidence: 88 },
  { command: "Apa yang akan expired besok?", action: "check_expiry", confidence: 92 },
  { command: "Buatkan resep dari ayam", action: "suggest_recipe", confidence: 90 },
  { command: "Reminder beli susu", action: "add_reminder", confidence: 85 },
]

const quickResponses = [
  "Baik, saya tambahkan tomat 2kg ke inventaris Anda",
  "Stok beras Anda saat ini 3.5kg, cukup untuk 2 minggu",
  "Besok ada 3 item yang akan expired: tomat, susu, dan roti",
  "Saya menemukan 5 resep ayam yang cocok dengan bahan Anda",
  "Reminder beli susu sudah ditambahkan untuk besok",
]

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  // Simulate voice recognition
  const startListening = () => {
    setIsListening(true)
    setTranscript("")

    // Simulate voice input after 3 seconds
    setTimeout(() => {
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)]
      setTranscript(randomCommand.command)
      setConfidence(randomCommand.confidence)
      setIsListening(false)

      // Process command
      setTimeout(() => {
        const randomResponse = quickResponses[Math.floor(Math.random() * quickResponses.length)]
        setResponse(randomResponse)

        if (voiceEnabled) {
          setIsSpeaking(true)
          // Simulate speech duration
          setTimeout(() => setIsSpeaking(false), 3000)
        }
      }, 1000)
    }, 3000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (isSpeaking) {
      setIsSpeaking(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Voice Assistant
          <Badge className="bg-purple-100 text-purple-700">Beta</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={isListening ? stopListening : startListening}
            className={`w-20 h-20 rounded-full ${
              isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSpeaking}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={toggleVoice}
            className={`w-16 h-16 rounded-full ${isSpeaking ? "animate-pulse" : ""}`}
          >
            {voiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </Button>
        </div>

        {/* Status */}
        <div className="text-center">
          {isListening && (
            <div className="space-y-2">
              <p className="text-blue-600 font-medium">🎤 Mendengarkan...</p>
              <Progress value={66} className="w-full" />
            </div>
          )}

          {isSpeaking && (
            <div className="space-y-2">
              <p className="text-green-600 font-medium">🔊 Berbicara...</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-green-400 rounded animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {!isListening && !isSpeaking && <p className="text-gray-600">Tekan tombol mikrofon untuk mulai berbicara</p>}
        </div>

        {/* Transcript & Response */}
        {transcript && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">Anda berkata:</span>
                <Badge variant="outline" className="text-xs">
                  {confidence}% confident
                </Badge>
              </div>
              <p className="text-blue-800">"{transcript}"</p>
            </div>

            {response && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">Assistant:</span>
                </div>
                <p className="text-green-800">{response}</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Commands */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Contoh Perintah Suara:</h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              "Tambah [item] [jumlah] [satuan]",
              "Berapa stok [item]?",
              "Apa yang akan expired [waktu]?",
              "Buatkan resep dari [bahan]",
              "Reminder beli [item]",
              "Set timer [waktu] menit",
            ].map((command, index) => (
              <div key={index} className="bg-gray-50 rounded p-2 text-sm text-gray-700">
                💬 {command}
              </div>
            ))}
          </div>
        </div>

        {/* Language Settings */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Bahasa:</span>
            <Badge variant="outline">Bahasa Indonesia</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
