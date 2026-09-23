import { AppShell } from "@/app/_components/app-shell";

interface EditKidPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditKidPage({ params }: EditKidPageProps) {
  await params;
  return (
    <AppShell>
      <div className="p-8 font-medium">Pantalla pendiente</div>
    </AppShell>
  );
}
