import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { institutions } from "@/data/institutions";
import DepartementInfoCard from "@/components/info/departement-info-card";
import UniInfoSecondCard from "@/components/info/uni-info-second-card";

export default function UniversityPage() {
  const { institution = "" } = useParams();
  const { t } = useLanguage();
  const data = institutions.find((inst) => inst.id === institution);

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">{t("exam.subjectNotFound")}</p>
        <Link to="/info" className="text-sm font-medium text-blue-600 hover:underline">
          {t("nav.info")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/info"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.info")}
        </Link>
        <h1 className="text-xl font-bold text-foreground">{t(data.nameKey)}</h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.5fr_1fr]">
        <div className="w-full">
          <DepartementInfoCard institution={data} />
        </div>
        <UniInfoSecondCard institution={data} />
      </div>
    </div>
  );
}