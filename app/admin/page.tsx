import { prisma } from '@/lib/db';

export default async function AdminPage() {
  const logs = await prisma.chatLog.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 bg-zinc-50 min-h-screen font-sans">
      <h1 className="text-2xl font-black mb-6 border-b-4 border-yellow-500 inline-block">SITE CHAT LOGS</h1>
      <table className="w-full bg-white border border-zinc-300 shadow-sm rounded">
        <thead className="bg-zinc-100 text-left">
          <tr>
            <th className="p-3 border-b">Time</th>
            <th className="p-3 border-b">User Query</th>
            <th className="p-3 border-b">Bot Answer</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-zinc-50">
              <td className="p-3 border-b text-xs text-zinc-500">
                {new Date(log.createdAt).toLocaleString()}
              </td>
              <td className="p-3 border-b text-sm font-bold">{log.query}</td>
              <td className="p-3 border-b text-sm text-zinc-600">{log.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}