import { NextResponse } from 'next/server'

const CLOSE_API_URL = 'https://api.close.com/api/v1'

const PAGE_STATUSES: Record<string, string> = {
  crocheting:       'New Crocheting Subscriber! - MSP',
  'islamic-learning': 'New Islamic Learning Subscriber! - MSP',
  organize:         'New Organize Subscriber! - MSP',
  books:            'New Books Subscriber! - MSP',
  podcasts:         'New Podcasts Subscriber! - MSP',
  videos:           'New Videos Subscriber! - MSP',
  courses:          'New Courses Subscriber! - MSP',
  apps:             'New Apps Subscriber! - MSP',
  roadmap:          'New Roadmap Subscriber! - MSP',
  about:            'New Muslim Success Path Subscriber!',
}

const TASK_LABELS: Record<string, string> = {
  crocheting:         '🧶 Add to CROCHETING newsletter — Muslim Success Path',
  'islamic-learning': '☪️ Add to ISLAMIC LEARNING newsletter — Muslim Success Path',
  organize:           '🗂️ Add to ORGANIZE newsletter — Muslim Success Path',
  books:              '📚 Add to BOOKS newsletter — Muslim Success Path',
  podcasts:           '🎙️ Add to PODCASTS newsletter — Muslim Success Path',
  videos:             '▶️ Add to VIDEOS newsletter — Muslim Success Path',
  courses:            '🎓 Add to COURSES newsletter — Muslim Success Path',
  apps:               '📱 Add to APPS newsletter — Muslim Success Path',
  roadmap:            '🗺️ Add to ROADMAP newsletter — Muslim Success Path',
  about:              '📧 Add to MAIN newsletter — Muslim Success Path',
}

export async function POST(req: Request) {
  try {
    const { email, name, page } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (!page || !PAGE_STATUSES[page]) {
      return NextResponse.json({ error: 'Invalid page' }, { status: 400 })
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

    // ── Step 1.5: Get the correct status ID ──
    const statusRes = await fetch(`${CLOSE_API_URL}/status/lead/`, { headers })
    const statusData = await statusRes.json()
    const statusLabel = PAGE_STATUSES[page]
    const foundStatus = statusData?.data?.find((s: { label: string }) => s.label === statusLabel)
    const statusId = foundStatus?.id
    console.log(`Status for ${page}:`, statusId)

    let leadId: string

    if (existingLead) {
      leadId = existingLead.id
      console.log('Existing lead found:', leadId, 'status:', existingLead.status_label)

      if (existingLead.status_label === 'Business Mainframe') {
        console.log('Lead is Business Mainframe — creating a new separate lead instead')
        const leadRes = await fetch(`${CLOSE_API_URL}/lead/`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: name || email,
            ...(statusId ? { status_id: statusId } : { status_label: statusLabel }),
            contacts: [{ name: name || undefined, emails: [{ email, type: 'office' }] }],
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
            ...(statusId ? { status_id: statusId } : { status_label: statusLabel }),
          }),
        })
        const updateData = await updateRes.json()
        console.log('Status update response:', updateData.status_label)
      }
    } else {
      // ── Step 2: No lead found — create a new one ──
      const leadRes = await fetch(`${CLOSE_API_URL}/lead/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: name || email,
          ...(statusId ? { status_id: statusId } : { status_label: statusLabel }),
          contacts: [{ name: name || undefined, emails: [{ email, type: 'office' }] }],
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

    // ── Step 3: Create a task ──
    const taskLabel = TASK_LABELS[page]
    const taskRes = await fetch(`${CLOSE_API_URL}/task/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        lead_id: leadId,
        text: `${taskLabel} | ${name || email} | ${email}`,
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
    console.error('Newsletter page route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}