import InfoHeading from "@/components/info/info-heading";
import UniInfoCard from "@/components/info/uni-info-card";
import { institutions } from "@/data/institutions";

export default function InfoPage() {
  return (
    <div className="space-y-8">
      <InfoHeading />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {institutions.map((institution) => (
          <UniInfoCard key={institution.id} institution={institution} />
        ))}
      </div>
    </div>
  );
}
