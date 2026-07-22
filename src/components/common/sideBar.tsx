
export default function SideBar(){
    return(
        <aside className="w-64 bg-white border-r border-slate-200 p-6">
  <h1 className="text-xl font-bold text-blue-400">
    TaskFlow
  </h1>

  <nav className="mt-8 space-y-2">
    <button className="w-full rounded-lg bg-blue-400 px-4 py-3 text-left text-white">
      Overview
    </button>

    <button className="w-full rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-100">
      Tasks
    </button>
  </nav>
</aside>
    )
}