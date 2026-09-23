import { AppShell } from "@/app/_components/app-shell";

interface KidDaySummaryPageProps {
  params: Promise<{ id: string }>;
}

export default async function KidDaySummaryPage({
  params,
}: KidDaySummaryPageProps) {
  await params;
  return (
    <AppShell>
      <div className="p-8 font-medium">Pantalla pendiente</div>
    </AppShell>
  );
}
