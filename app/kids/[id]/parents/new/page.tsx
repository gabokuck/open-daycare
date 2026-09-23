import { AppShell } from "@/app/_components/app-shell";

interface NewParentPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewParentPage({ params }: NewParentPageProps) {
  await params;
  return (
    <AppShell>
      <div className="p-8 font-medium">Pantalla pendiente</div>
    </AppShell>
  );
}
