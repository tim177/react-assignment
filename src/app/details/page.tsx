import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Details } from "@/components/details";

export default function DetailsPage() {
  return (
    <AuthenticatedLayout>
      <Details />
    </AuthenticatedLayout>
  );
}
