import { NextResponse } from 'next/server'

const CLOSE_API_URL = 'https://api.close.com/api/v1'

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const apiKey = process.env.CLOSE_API_KEY
    if (!apiKey) {
      console.error('CLOSE_API_KEY is not set')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const credentials = Buffer.from(`${apiKey}:`).toString('base64')

    // Log available statuses to help debug label mismatch
    const statusRes = await fetch(`${CLOSE_API_URL}/status/lead/`, {
      headers: { 'Authorization': `Basic ${credentials}` },
    })
    const statusData = await statusRes.json()
    console.log('Available lead statuses:', JSON.stringify(statusData?.data?.map((s: { label: string }) => s.label)))

    // Create the lead
    const leadRes = await fetch(`${CLOSE_API_URL}/lead/`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name || email,
        status_label: 'New Muslim Success Path Subscriber',
        contacts: [
          {
            name: name || undefined,
            emails: [{ email, type: 'office' }],
          },
        ],
      }),
    })

    const leadData = await leadRes.json()

    if (!leadRes.ok) {
      console.error('Close CRM lead creation failed:', JSON.stringify(leadData))
      return NextResponse.json({ error: 'Failed to create lead', detail: leadData }, { status: 500 })
    }

    console.log('Lead created successfully:', leadData.id)
    return NextResponse.json({ success: true, leadId: leadData.id })

  } catch (err) {
    console.error('Newsletter route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}