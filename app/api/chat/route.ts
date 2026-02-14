import { NextResponse } from 'next/server';
import faqData from '@/data/faq.json';
import Fuse from 'fuse.js';
import { prisma } from '@/lib/db';

const fuse = new Fuse(faqData, {
  keys: ['question'],
  threshold: 0.4,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const results = fuse.search(message);

    const botAnswer = results.length > 0 
      ? results[0].item.answer 
      : "I'm sorry, I don't have that information in my current site logs. Please email test@gmail.com for more details.";

    // --- SAVE TO SQLITE ---
    await prisma.chatLog.create({
      data: {
        query: message,
        answer: botAnswer,
      },
    });

    return NextResponse.json({ text: botAnswer });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ text: "System error." }, { status: 500 });
  }
}