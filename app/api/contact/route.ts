import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: 'Tüm alanları doldurun'
      }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Geçerli bir email adresi girin'
      }, { status: 400 })
    }

    // Create mailto link for fallback
    const subject = `Portfolio Contact from ${name}`
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    const mailtoLink = `mailto:aliemredag@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`

    // Save to localStorage for admin viewing
    if (typeof window !== 'undefined') {
      try {
        const messages = JSON.parse(localStorage.getItem('contact-messages') || '[]')
        messages.unshift({
          id: Date.now().toString(),
          name,
          email,
          message,
          timestamp: new Date().toISOString()
        })
        localStorage.setItem('contact-messages', JSON.stringify(messages))
      } catch (error) {
        console.error('Error saving message:', error)
      }
    }

    // Return mailto link for client to open
    return NextResponse.json({
      success: true,
      message: 'Mesajınız gönderildi!',
      mailtoLink
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({
      success: false,
      message: 'Bir hata oluştu. Lütfen tekrar deneyin.'
    }, { status: 500 })
  }
}
