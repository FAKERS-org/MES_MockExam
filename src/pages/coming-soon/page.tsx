import { ClipboardList, Clock, FileCheck, History, ListChecks, Timer, User, UserRound, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import ComingSoon from "@/components/shared/coming-soon";
import { useLanguage } from "@/lib/i18n";

type FeatureId = "exam" | "history" | "profile";

function resolveFeature(pathname: string): FeatureId {
  if (pathname.startsWith("/history")) return "history";
  if (pathname.startsWith("/profile")) return "profile";
  return "exam";
}

export default function ComingSoonPage() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const feature = resolveFeature(pathname);

  const config = {
    exam: {
      title: t("comingSoon.exam.title"),
      description: t("comingSoon.exam.description"),
      features: [
        { icon: ClipboardList, label: t("comingSoon.exam.features.mock") },
        { icon: Timer, label: t("comingSoon.exam.features.timed") },
        { icon: ListChecks, label: t("comingSoon.exam.features.mcq") },
        { icon: FileCheck, label: t("comingSoon.exam.features.score") },
      ],
    },
    history: {
      title: t("comingSoon.history.title"),
      description: t("comingSoon.history.description"),
      features: [
        { icon: History, label: t("comingSoon.history.features.results") },
        { icon: FileCheck, label: t("comingSoon.history.features.scores") },
        { icon: Clock, label: t("comingSoon.history.features.duration") },
        { icon: ListChecks, label: t("comingSoon.history.features.review") },
      ],
    },
    profile: {
      title: t("comingSoon.profile.title"),
      description: t("comingSoon.profile.description"),
      features: [
        { icon: User, label: t("comingSoon.profile.features.account") },
        { icon: UserRound, label: t("comingSoon.profile.features.info") },
        { icon: Settings, label: t("comingSoon.profile.features.settings") },
      ],
    },
  }[feature];

  return (
    <ComingSoon
      title={config.title}
      description={config.description}
      features={config.features}
    />
  );
}
