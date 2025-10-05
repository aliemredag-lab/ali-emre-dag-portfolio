import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CHAT_LOGS_PATH = path.join(process.cwd(), 'data', 'chat-logs.json')

interface ChatLog {
  id: string
  sessionId: string
  messages: {
    type: 'user' | 'bot'
    content: string
    timestamp: string
  }[]
  startTime: string
  lastActivity: string
  userInfo?: {
    userAgent?: string
    ip?: string
  }
}

// Ensure chat logs file exists
function ensureChatLogsFile(): ChatLog[] {
  try {
    if (fs.existsSync(CHAT_LOGS_PATH)) {
      const data = fs.readFileSync(CHAT_LOGS_PATH, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading chat logs:', error)
  }

  // Create new file if it doesn't exist
  const logsDir = path.dirname(CHAT_LOGS_PATH)
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true })
  }

  fs.writeFileSync(CHAT_LOGS_PATH, JSON.stringify([], null, 2))
  return []
}

// Save chat log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, message, type } = body

    if (!sessionId || !message || !type) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 })
    }

    const logs = ensureChatLogsFile()

    // Find or create session
    let sessionLog = logs.find(log => log.sessionId === sessionId)

    if (!sessionLog) {
      sessionLog = {
        id: Date.now().toString(),
        sessionId,
        messages: [],
        startTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        userInfo: {
          userAgent: request.headers.get('user-agent') || undefined,
          ip: request.ip || request.headers.get('x-forwarded-for') || undefined
        }
      }
      logs.push(sessionLog)
    }

    // Add message
    sessionLog.messages.push({
      type,
      content: message,
      timestamp: new Date().toISOString()
    })

    sessionLog.lastActivity = new Date().toISOString()

    // Save to file
    fs.writeFileSync(CHAT_LOGS_PATH, JSON.stringify(logs, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Chat log saved'
    })
  } catch (error) {
    console.error('Error saving chat log:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 })
  }
}

// Get all chat logs (admin only)
export async function GET(request: NextRequest) {
  try {
    const logs = ensureChatLogsFile()

    // Sort by most recent activity
    const sortedLogs = logs.sort((a, b) =>
      new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    )

    return NextResponse.json({
      success: true,
      logs: sortedLogs,
      totalSessions: logs.length,
      totalMessages: logs.reduce((sum, log) => sum + log.messages.length, 0)
    })
  } catch (error) {
    console.error('Error fetching chat logs:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 })
  }
}
