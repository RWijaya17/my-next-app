import { NextResponse } from 'next/server'
import type { Scenario } from '@/lib/types'

let scenarios: Scenario[] = [
  {
    id: 1,
    mode: 'escape',
    text: 'Search under the desk',
    difficulty: 'easy',
    createdAt: new Date().toISOString(),
  },
]

let nextId = 2

export async function GET() {
  return NextResponse.json(scenarios)
}

// CREATE
export async function POST(request: Request) {
  const body = await request.json()

  if (!body?.text || !body?.mode) {
    return NextResponse.json(
      { error: 'mode and text are required' },
      { status: 400 },
    )
  }

  const newScenario: Scenario = {
    id: nextId++,
    mode: body.mode === 'court' ? 'court' : 'escape',
    text: String(body.text),
    difficulty: body.difficulty ?? 'medium',
    createdAt: new Date().toISOString(),
  }

  scenarios.push(newScenario)

  return NextResponse.json(newScenario, { status: 201 })
}

// UPDATE
export async function PUT(request: Request) {
  const body = await request.json()
  const id = Number(body?.id)

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  const index = scenarios.findIndex((s) => s.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  scenarios[index] = {
    ...scenarios[index],
    ...body,
    id, // enforce correct id
  }

  return NextResponse.json(scenarios[index])
}

// DELETE
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))

  if (!id) {
    return NextResponse.json({ error: 'id query param is required' }, { status: 400 })
  }

  const index = scenarios.findIndex((s) => s.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const removed = scenarios.splice(index, 1)[0]
  return NextResponse.json(removed)
}
