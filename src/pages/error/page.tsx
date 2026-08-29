import { Link } from "react-router-dom";
import { CircleAlert, Home } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-background p-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
        <CircleAlert className="size-7 text-destructive" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{t("error.title")}</p>
        <h1 className="text-3xl font-bold tracking-tight">{t("error.heading")}</h1>
      </div>
      <p className="max-w-md text-sm text-muted-foreground">{t("error.description")}</p>
      <Button asChild>
        <Link to="/">
          <Home className="size-4" />
          {t("error.goHome")}
        </Link>
      </Button>
    </div>
  );
}