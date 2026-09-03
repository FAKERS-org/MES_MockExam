import { Button } from "@/components/ui/button"
import { Sun, Bell, Settings, X } from "lucide-react"

export function ExamLayoutTopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
      {/* Left: Thai title */}
      <div className="flex items-center">
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          Mockexam on Math
        </h1>
      </div>

      {/* Right: action icons */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Sun className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Close">
          <X className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}