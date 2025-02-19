import Head from 'next/head';
import Chat from '../../app/components/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      <Head>
        <title>Reva - Refound Chatbot</title>
        <meta name="description" content="AI Chatbot for Refound powered by Next.js & OpenAI" />
      </Head>

      <h1 className="text-4xl font-bold text-white mb-6">💬 Reva - Your Smart Assistant</h1>

      <div className="w-full max-w-md">
        <Chat />
      </div>
    </div>
  );
}
