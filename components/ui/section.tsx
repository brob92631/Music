export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">{children}</div>
    </section>
  )
}
