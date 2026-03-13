import { NextResponse } from 'next/server'

const CLOSE_API_URL = 'https://api.close.com/api/v1'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !email.includes('@') || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const apiKey = process.env.CLOSE_API_KEY
    if (!apiKey) {
      console.error('CLOSE_API_KEY is not set')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const credentials = Buffer.from(`${apiKey}:`).toString('base64')
    const headers = {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    }

    // ── Step 1: Search for existing lead by email ──
    const searchRes = await fetch(
      `${CLOSE_API_URL}/lead/?query=${encodeURIComponent(`email:"${email}"`)}&_fields=id,status_label`,
      { headers }
    )
    const searchData = await searchRes.json()
    console.log('Search response count:', searchData?.data?.length, 'first match:', searchData?.data?.[0]?.id)
    const existingLead = searchData?.data?.[0] ?? null

    // ── Step 1.5: Get the correct status ID for Contact Form Submission ──
    const statusRes = await fetch(`${CLOSE_API_URL}/status/lead/`, { headers })
    const statusData = await statusRes.json()
    const contactStatus = statusData?.data?.find((s: { label: string }) => s.label === 'New Contact Form Submission! - MSP')
    const contactStatusId = contactStatus?.id
    console.log('Contact form status ID:', contactStatusId)

    let leadId: string

    if (existingLead) {
      // ── Step 2a: Lead exists — check it is not a Business Mainframe lead ──
      leadId = existingLead.id
      console.log('Existing lead found:', leadId, 'status:', existingLead.status_label)

      if (existingLead.status_label === 'Business Mainframe') {
        console.log('Lead is Business Mainframe — creating a new separate lead instead')
        const leadRes = await fetch(`${CLOSE_API_URL}/lead/`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: name || email,
            ...(contactStatusId ? { status_id: contactStatusId } : { status_label: 'New Contact Form Submission! - MSP' }),
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
        leadId = leadData.id
        console.log('New lead created for Business Mainframe contact:', leadId)
      } else {
        const updateRes = await fetch(`${CLOSE_API_URL}/lead/${leadId}/`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            ...(contactStatusId ? { status_id: contactStatusId } : { status_label: 'New Contact Form Submission! - MSP' }),
          }),
        })
        const updateData = await updateRes.json()
        console.log('Status update response:', updateData.status_label)
      }
    } else {
      // ── Step 2b: No lead found — create a new one ──
      const leadRes = await fetch(`${CLOSE_API_URL}/lead/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: name || email,
          ...(contactStatusId ? { status_id: contactStatusId } : { status_label: 'New Contact Form Submission! - MSP' }),
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

      leadId = leadData.id
      console.log('New lead created:', leadId)
    }

    // ── Step 3: Add note to the lead timeline ──
    const noteBody = [
      '📬 New Contact Form Submission! - MSP',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      subject ? `Subject: ${subject}` : null,
      '',
      'Message:',
      message,
    ]
      .filter(line => line !== null)
      .join('\n')

    const noteRes = await fetch(`${CLOSE_API_URL}/activity/note/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        lead_id: leadId,
        note: noteBody,
      }),
    })

    const noteData = await noteRes.json()

    if (!noteRes.ok) {
      console.error('Close CRM note creation failed:', JSON.stringify(noteData))
      return NextResponse.json({ error: 'Failed to add note', detail: noteData }, { status: 500 })
    }

    console.log('Note added to lead:', leadId)

    // ── Step 4: Create a task to reply to the contact form ──
    const taskRes = await fetch(`${CLOSE_API_URL}/task/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        lead_id: leadId,
        text: `📬 Reply to contact form message from ${name} (${email})${subject ? ` — Subject: ${subject}` : ''}`,
        due_date: new Date().toISOString().split('T')[0],
        is_complete: false,
      }),
    })
    const taskData = await taskRes.json()
    if (!taskRes.ok) {
      console.error('Close CRM task creation failed:', JSON.stringify(taskData))
    } else {
      console.log('Task created:', taskData.id)
    }

    return NextResponse.json({ success: true, leadId })

  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}