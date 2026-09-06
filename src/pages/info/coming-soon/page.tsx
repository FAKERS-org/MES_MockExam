import { Building2, GraduationCap, BookOpen, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import ComingSoon from "@/components/shared/coming-soon";
import UniInfoCard from "@/components/info/uni-info-card";
import { institutions } from "@/data/institutions";

export default function InfoComingSoonPage() {
  const { t } = useLanguage();

  const features = [
    { icon: Building2, label: t("comingSoon.features.institutions") },
    { icon: GraduationCap, label: t("comingSoon.features.departments") },
    { icon: BookOpen, label: t("comingSoon.features.exams") },
    { icon: Clock, label: t("comingSoon.features.timed") },
  ];

  return (
    <ComingSoon
      title={t("comingSoon.title")}
      description={t("comingSoon.description")}
      features={features}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {institutions.map((institution) => (
          <UniInfoCard key={institution.id} institution={institution} />
        ))}
      </div>
    </ComingSoon>
  );
}
