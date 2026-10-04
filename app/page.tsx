'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownToLine,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Home,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  Settings2,
  ShoppingBasket,
  Trash2,
  TrendingUp,
  Utensils,
  Zap,
} from 'lucide-react'

type Category = 'Housing' | 'Food' | 'Utilities' | 'Transport' | 'Health' | 'Other'
type Expense = { id: number; title: string; amount: number; date: string; category: Category }

const categoryStyles: Record<Category, { icon: typeof Home; color: string; soft: string }> = {
  Housing: { icon: Home, color: 'text-[#315c4c]', soft: 'bg-[#e4f0e9]' },
  Food: { icon: Utensils, color: 'text-[#bb6b35]', soft: 'bg-[#faeadc]' },
  Utilities: { icon: Zap, color: 'text-[#846d22]', soft: 'bg-[#f5efd0]' },
  Transport: { icon: TrendingUp, color: 'text-[#7162a4]', soft: 'bg-[#ebe7f8]' },
  Health: { icon: CircleDollarSign, color: 'text-[#a04f62]', soft: 'bg-[#f8e3e8]' },
  Other: { icon: ReceiptText, color: 'text-[#65717d]', soft: 'bg-[#e9edf0]' },
}

const starterExpenses: Expense[] = [
  { id: 1, title: 'Monthly rent', amount: 1850, date: '2026-10-01', category: 'Housing' },
  { id: 2, title: 'Groceries', amount: 124.68, date: '2026-10-02', category: 'Food' },
  { id: 3, title: 'Electric bill', amount: 86.2, date: '2026-10-03', category: 'Utilities' },
  { id: 4, title: 'Gas & parking', amount: 72.5, date: '2026-10-04', category: 'Transport' },
]

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[]>(starterExpenses)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('2026-10-04')
  const [category, setCategory] = useState<Category>('Housing')
  const [query, setQuery] = useState('')

  const filteredExpenses = expenses.filter((expense) =>
    `${expense.title} ${expense.category}`.toLowerCase().includes(query.toLowerCase()),
  )
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const categoryTotals = useMemo(() => {
    return (Object.keys(categoryStyles) as Category[])
      .map((name) => ({ name, total: expenses.filter((expense) => expense.category === name).reduce((sum, expense) => sum + expense.amount, 0) }))
      .filter((item) => item.total > 0)
      .sort((a, b) => b.total - a.total)
  }, [expenses])

  function addExpense(event: React.FormEvent) {
    event.preventDefault()
    const numericAmount = Number(amount)
    if (!title.trim() || !numericAmount || numericAmount < 0) return
    setExpenses((current) => [{ id: Date.now(), title: title.trim(), amount: numericAmount, date, category }, ...current])
    setTitle('')
    setAmount('')
  }

  function exportCsv() {
    const csv = ['Title,Amount,Date,Category', ...expenses.map((expense) => `"${expense.title}",${expense.amount},${expense.date},${expense.category}`)].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'home-expenses.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#202522]">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-[232px] shrink-0 flex-col border-r border-[#e2e1d9] bg-[#f8f7f2] px-5 py-7 lg:flex">
          <div className="flex items-center gap-3 px-2">
            <span className="grid size-9 place-items-center rounded-xl bg-[#315c4c] text-white"><Home aria-hidden="true" /></span>
            <div><p className="font-semibold tracking-tight">NestLedger</p><p className="text-[10px] uppercase tracking-[0.18em] text-[#88918b]">Home finances</p></div>
          </div>
          <nav className="mt-12 flex flex-col gap-2" aria-label="Main navigation">
            <a className="flex items-center gap-3 rounded-xl bg-[#e4f0e9] px-3 py-2.5 text-sm font-semibold text-[#315c4c]" href="#overview"><ReceiptText aria-hidden="true" /> Overview</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#78817c] hover:bg-white" href="#expenses"><CircleDollarSign aria-hidden="true" /> Expenses</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#78817c] hover:bg-white" href="#categories"><ShoppingBasket aria-hidden="true" /> Categories</a>
          </nav>
          <div className="mt-auto rounded-2xl bg-[#315c4c] p-4 text-white">
            <p className="text-sm font-semibold">Keep it simple.</p><p className="mt-1 text-xs leading-5 text-[#cfe2d7]">Small habits add up to a calmer home.</p>
            <div className="mt-4 h-1 rounded-full bg-white/20"><div className="h-full w-3/4 rounded-full bg-[#d9ef75]" /></div>
          </div>
        </aside>

        <section className="flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-9">
          <header className="flex items-start justify-between gap-4">
            <div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#89928b] lg:hidden"><Home aria-hidden="true" /> NestLedger</div><p className="text-sm text-[#818983]">Saturday, October 4, 2026</p><h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Good morning, Alex.</h1></div>
            <div className="flex items-center gap-2"><button className="hidden items-center gap-2 rounded-xl border border-[#deded5] bg-[#faf9f5] px-3 py-2 text-sm font-medium text-[#59635d] hover:bg-white sm:flex" onClick={exportCsv}><ArrowDownToLine aria-hidden="true" /> Export CSV</button><button aria-label="Settings" className="grid size-10 place-items-center rounded-xl border border-[#deded5] bg-[#faf9f5] text-[#748078] hover:bg-white"><Settings2 aria-hidden="true" /></button><span className="grid size-10 place-items-center rounded-full bg-[#d9ef75] text-sm font-bold text-[#315c4c]">A</span></div>
          </header>

          <div id="overview" className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
            <article className="relative overflow-hidden rounded-3xl bg-[#315c4c] p-6 text-white sm:p-8"><div className="relative z-10"><p className="text-sm text-[#cfe2d7]">Total tracked expenses</p><p className="mt-2 text-5xl font-semibold tracking-[-0.06em]">{money.format(total)}</p><div className="mt-7 flex items-center gap-2 text-sm text-[#d9ef75]"><TrendingUp aria-hidden="true" /> <span>All expenses this month</span></div></div><div className="absolute -right-10 -top-16 size-64 rounded-full border-[32px] border-[#42745f] opacity-60" /><div className="absolute -bottom-14 right-16 size-40 rounded-full border-[18px] border-[#5b8b70] opacity-40" /></article>
            <article className="rounded-3xl bg-[#d9ef75] p-6 text-[#315c4c] sm:p-8"><div className="flex items-center justify-between"><p className="text-sm font-semibold">This month</p><CalendarDays aria-hidden="true" /></div><p className="mt-6 text-3xl font-semibold tracking-[-0.05em]">{expenses.length} <span className="text-base font-normal">items added</span></p><p className="mt-2 text-sm text-[#54705e]">Stay on top of your household rhythm.</p></article>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <section id="expenses" className="rounded-3xl border border-[#e2e1d9] bg-[#fbfaf6] p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-semibold tracking-tight">Recent expenses</h2><p className="mt-1 text-sm text-[#89928b]">A clear view of where home money goes.</p></div><div className="relative"><Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba39e]" /><input aria-label="Search expenses" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-36 rounded-xl border border-[#e2e1d9] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#315c4c] sm:w-44" /></div></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[520px] text-left"><thead><tr className="border-b border-[#e8e7df] text-[11px] uppercase tracking-[0.15em] text-[#99a09b]"><th className="pb-3 font-medium">Expense</th><th className="pb-3 font-medium">Category</th><th className="pb-3 font-medium">Date</th><th className="pb-3 text-right font-medium">Amount</th><th /></tr></thead><tbody>{filteredExpenses.map((expense) => { const style = categoryStyles[expense.category]; const Icon = style.icon; return <tr key={expense.id} className="group border-b border-[#efeee8] last:border-0"><td className="py-4 font-medium">{expense.title}</td><td className="py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.soft} ${style.color}`}><Icon aria-hidden="true" /> {expense.category}</span></td><td className="py-4 text-sm text-[#89928b]">{new Date(`${expense.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td><td className="py-4 text-right font-semibold">{money.format(expense.amount)}</td><td className="py-4 pl-3 text-right"><button aria-label={`Delete ${expense.title}`} onClick={() => setExpenses((current) => current.filter((item) => item.id !== expense.id))} className="rounded-lg p-2 text-[#a7ada8] opacity-0 transition group-hover:opacity-100 hover:bg-[#fae3e5] hover:text-[#a04f62]"><Trash2 aria-hidden="true" /></button></td></tr> })}</tbody></table>{filteredExpenses.length === 0 && <p className="py-10 text-center text-sm text-[#89928b]">No expenses match your search.</p>}</div></section>

            <section id="categories" className="rounded-3xl border border-[#e2e1d9] bg-[#fbfaf6] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold tracking-tight">By category</h2><p className="mt-1 text-sm text-[#89928b]">Your spending mix</p></div><button aria-label="More category options" className="text-[#89928b]"><MoreHorizontal aria-hidden="true" /></button></div><div className="mt-6 flex flex-col gap-5">{categoryTotals.map((item) => { const style = categoryStyles[item.name]; const Icon = style.icon; return <div key={item.name}><div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 font-medium"><span className={`grid size-7 place-items-center rounded-lg ${style.soft} ${style.color}`}><Icon aria-hidden="true" /></span>{item.name}</span><span className="font-semibold">{money.format(item.total)}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#ecece5]"><div className="h-full rounded-full bg-[#315c4c]" style={{ width: `${Math.max((item.total / total) * 100, 5)}%` }} /></div></div> })}</div></section>
          </div>

          <section className="mt-6 rounded-3xl border border-[#e2e1d9] bg-white p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#e4f0e9] text-[#315c4c]"><Plus aria-hidden="true" /></span><div><h2 className="font-semibold">Add an expense</h2><p className="text-sm text-[#89928b]">Capture it now, remember it later.</p></div></div><form onSubmit={addExpense} className="mt-5 grid gap-3 md:grid-cols-[1.4fr_0.8fr_0.9fr_1fr_auto]"><input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Expense title" aria-label="Expense title" className="rounded-xl border border-[#e2e1d9] bg-[#fbfaf6] px-3 py-2.5 text-sm outline-none focus:border-[#315c4c]" /><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#89928b]">$</span><input required min="0" step="0.01" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount" aria-label="Amount" className="w-full rounded-xl border border-[#e2e1d9] bg-[#fbfaf6] py-2.5 pl-7 pr-3 text-sm outline-none focus:border-[#315c4c]" /></div><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Date" className="rounded-xl border border-[#e2e1d9] bg-[#fbfaf6] px-3 py-2.5 text-sm outline-none focus:border-[#315c4c]" /><label className="relative"><span className="sr-only">Category</span><select value={category} onChange={(event) => setCategory(event.target.value as Category)} className="w-full appearance-none rounded-xl border border-[#e2e1d9] bg-[#fbfaf6] px-3 py-2.5 text-sm outline-none focus:border-[#315c4c]">{(Object.keys(categoryStyles) as Category[]).map((item) => <option key={item}>{item}</option>)}</select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#89928b]" /></label><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#315c4c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#254b3d]"><Plus aria-hidden="true" /> Add</button></form></section>
        </section>
      </div>
    </main>
  )
}
