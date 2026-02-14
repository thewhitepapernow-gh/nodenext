import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100 font-sans text-zinc-900">
      {/* Hero Section */}
      <header className="bg-zinc-900 text-white py-20 px-6 border-b-8 border-yellow-500">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl font-black tracking-tighter uppercase mb-4">
            Nexus <span className="text-yellow-500 underline">Bridge</span> Construction
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl font-light">
            Infrastructure excellence. Currently executing Phase II of the Metropolitan 
            Transit Overpass. Safety focused. Data driven. 
          </p>
          <div className="mt-8 flex gap-4">
            <div className="bg-zinc-800 p-4 border border-zinc-700 rounded">
              <span className="block text-zinc-500 text-xs uppercase font-bold">Project Status</span>
              <span className="text-green-400 font-mono">ON SCHEDULE</span>
            </div>
            <div className="bg-zinc-800 p-4 border border-zinc-700 rounded">
              <span className="block text-zinc-500 text-xs uppercase font-bold">Safety Record</span>
              <span className="text-yellow-500 font-mono">428 DAYS ACCIDENT FREE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="max-w-5xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold border-l-4 border-yellow-500 pl-4">Site Overview</h2>
          <p className="text-zinc-600 leading-relaxed">
            Welcome to the digital portal for the Nexus Bridge project. This platform 
            provides real-time updates for contractors, stakeholders, and the local community.
          </p>
          <ul className="space-y-3 font-medium">
            <li className="flex items-center gap-2">🏗️ Heavy Machinery Operation: 07:00 - 19:00</li>
            <li className="flex items-center gap-2">👷 Total Personnel on Site: 142</li>
            <li className="flex items-center gap-2">📍 Location: Sector 7G, Industrial Loop</li>
          </ul>
        </div>

        {/* Decorative Construction Card */}
        <div className="bg-white p-8 shadow-xl border border-zinc-200 rounded-lg flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h3 className="font-bold text-xl mb-2">Visitor Access</h3>
          <p className="text-zinc-500 text-sm">
            Strict PPE requirements in effect. Use the Site Assistant for orientation 
            and safety protocols before entering the perimeter.
          </p>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="max-w-5xl mx-auto py-12 px-6 border-t border-zinc-300 text-zinc-400 text-sm">
        © 2026 Nexus Bridge Construction Group. All rights reserved. 
        Authorized personnel only beyond this point.
      </footer>

      {/* The Chatbot Component */}
      <ChatBot />
    </main>
  );
}