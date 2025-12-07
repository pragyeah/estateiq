"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestAuthPage() {
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addResult = (message: string, isError = false) => {
    setResults((prev) => [...prev, `${isError ? "❌" : "✅"} ${message}`])
  }

  const testConnection = async () => {
    setIsLoading(true)
    setResults([])

    try {
      // Test 1: Check environment variables
      addResult("Testing environment variables...")
      const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
      const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      addResult(`Supabase URL configured: ${hasUrl}`)
      addResult(`Supabase Key configured: ${hasKey}`)

      if (!hasUrl || !hasKey) {
        addResult("Environment variables are missing!", true)
        setIsLoading(false)
        return
      }

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      addResult(`URL: ${url?.substring(0, 30)}...`)
      addResult(`Key starts with: ${key?.substring(0, 20)}...`)

      // Test 2: Create Supabase client
      addResult("Creating Supabase client...")
      let supabase
      try {
        supabase = createClient()
        addResult("Supabase client created successfully")
      } catch (err: any) {
        addResult(`Failed to create client: ${err.message}`, true)
        setIsLoading(false)
        return
      }

      // Test 3: Test API connection
      addResult("Testing API connection...")
      try {
        const response = await fetch(`${url}/rest/v1/`, {
          headers: {
            apikey: key!,
            Authorization: `Bearer ${key}`,
          },
        })
        addResult(`API Response Status: ${response.status}`)
        if (!response.ok) {
          addResult(`API Error: ${response.statusText}`, true)
        }
      } catch (err: any) {
        addResult(`API Connection failed: ${err.message}`, true)
      }

      // Test 4: Test Auth endpoint
      addResult("Testing Auth endpoint...")
      try {
        const authResponse = await fetch(`${url}/auth/v1/health`, {
          headers: {
            apikey: key!,
          },
        })
        addResult(`Auth Health Status: ${authResponse.status}`)
      } catch (err: any) {
        addResult(`Auth endpoint test failed: ${err.message}`, true)
      }

      // Test 5: Try to get session
      addResult("Checking current session...")
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          addResult(`Session error: ${error.message}`, true)
        } else {
          addResult(`Session check: ${session ? "Has session" : "No session"}`)
        }
      } catch (err: any) {
        addResult(`Session check failed: ${err.message}`, true)
      }

      // Test 6: Try sign up (with test email)
      addResult("Testing sign up functionality...")
      try {
        const testEmail = `test-${Date.now()}@test.com`
        const { data, error } = await supabase.auth.signUp({
          email: testEmail,
          password: "testpassword123",
        })

        if (error) {
          addResult(`Sign up error: ${error.message}`, true)
          addResult(`Error code: ${error.status || "N/A"}`)
        } else {
          addResult("Sign up test successful!")
          if (data.user) {
            addResult(`User created: ${data.user.email}`)
          }
          if (data.session) {
            addResult("Session created (email confirmation disabled)")
          } else {
            addResult("No session (email confirmation required)")
          }
        }
      } catch (err: any) {
        addResult(`Sign up test failed: ${err.message}`, true)
      }
    } catch (err: any) {
      addResult(`Unexpected error: ${err.message}`, true)
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Diagnostic Test</CardTitle>
          <CardDescription>
            This page will test your Supabase connection and authentication setup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection} disabled={isLoading} className="w-full">
            {isLoading ? "Running Tests..." : "Run Diagnostic Tests"}
          </Button>

          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Test Results:</h3>
              <div className="bg-muted p-4 rounded-md space-y-1 font-mono text-sm max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className={result.includes("❌") ? "text-destructive" : ""}>
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>What this tests:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Environment variables configuration</li>
              <li>Supabase client creation</li>
              <li>API endpoint connectivity</li>
              <li>Auth endpoint health</li>
              <li>Session management</li>
              <li>Sign up functionality</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

