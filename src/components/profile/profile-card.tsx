import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Pencil, Pen, Phone, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface ProfileInfo {
  name: string;
  role: string;
  username: string;
  gender: string;
  phone: string;
  email: string;
  avatarUrl?: string;
}

export interface ProfileField {
  key: string;
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
}

export interface ProfileCardProps {
  profile: ProfileInfo;
  onEdit?: () => void;
  editLabel?: ReactNode;
  fields?: ProfileField[];
  className?: string;
}

function FieldRow({ icon, label, value }: Omit<ProfileField, "key">) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-card shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <div className="flex-1">
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
    </div>
  );
}

export function ProfileCard({
  profile,
  onEdit,
  editLabel,
  fields,
  className,
}: ProfileCardProps) {
  const { t } = useLanguage();
  const rows = fields ?? [
    { key: "username", icon: <User className="h-4 w-4 text-muted-foreground" />, label: t("profile.username"), value: profile.username },
    { key: "gender", icon: <Pen className="h-4 w-4 text-muted-foreground" />, label: t("profile.gender"), value: profile.gender },
    { key: "phone", icon: <Phone className="h-4 w-4 text-muted-foreground" />, label: t("profile.phone"), value: profile.phone },
    { key: "email", icon: <Mail className="h-4 w-4 text-muted-foreground" />, label: t("profile.email"), value: profile.email },
  ];

  return (
    <Card className={cn("w-full bg-card shadow-sm", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
            </div>
          </div>
          {onEdit && (
            <Button variant="default" size="sm" className="gap-2" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
              <span>{editLabel ?? t("profile.edit")}</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">{t("profile.personalInfo")}</h3>
        </div>
        <div className="space-y-4">
          {rows.map((row) => (
            <FieldRow key={row.key} icon={row.icon} label={row.label} value={row.value} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
