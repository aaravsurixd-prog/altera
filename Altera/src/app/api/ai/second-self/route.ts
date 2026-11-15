import { NextRequest, NextResponse } from 'next/server';
import { synthesizeSecondSelfResponse } from '@/lib/ai-engine';
import { UserProfile, SecondSelfMemory } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, userProfile, memories, conversationHistory } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const result = await synthesizeSecondSelfResponse(
      query,
      userProfile as UserProfile,
      memories as SecondSelfMemory[],
      conversationHistory || []
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/second-self:', error);
    return NextResponse.json(
      { error: error.message || 'Internal AI generation failure' },
      { status: 500 }
    );
  }
}
