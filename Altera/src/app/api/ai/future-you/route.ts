import { NextRequest, NextResponse } from 'next/server';
import { synthesizeFutureScenarios } from '@/lib/ai-engine';
import { UserProfile } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dilemma, context, timeHorizon, tradeoff, userProfile } = body;

    if (!dilemma) {
      return NextResponse.json({ error: 'Dilemma is required' }, { status: 400 });
    }

    const result = await synthesizeFutureScenarios(
      dilemma,
      context || '',
      timeHorizon || '3-5 years',
      tradeoff || 'Autonomy vs. Scale',
      userProfile as UserProfile
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/future-you:', error);
    return NextResponse.json(
      { error: error.message || 'Internal scenario generation failure' },
      { status: 500 }
    );
  }
}
