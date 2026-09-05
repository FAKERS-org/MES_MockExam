import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Flag,
  X,
  AlertCircle,
  LayoutGrid,
  Minimize,
  Maximize,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EXAM_CONFIG } from "@/config/exam.config";
import { MathExpression } from "@/components/ui/math-expression";

type LayoutMode = "compact" | "normal" | "fullscreen";

// ─── Question data ───────────────────────────────────────────────────────────

interface Question {
  id: number;
  text: React.ReactNode;
  options: { id: string; text: React.ReactNode }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: <MathExpression>{"A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix},\\; \\det(A) = ?"}</MathExpression>,
    options: [
      { id: "A", text: "-2" },
      { id: "B", text: "2" },
      { id: "C", text: "-1" },
      { id: "D", text: "1" },
      { id: "E", text: "0" },
    ],
  },
  {
    id: 2,
    text: <MathExpression>{"f(x) = 3e^{x} - 2e^{2x} ជាកំណត់សមីការឌីផេរ៉ង់ស្យែលណា?"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"f'' - 3f' + 2f = 0"}</MathExpression> },
      { id: "B", text: <MathExpression>{"2f'' + 3f' + f = 0"}</MathExpression> },
      { id: "C", text: <MathExpression>{"f'' - 3f' - 2f = 0"}</MathExpression> },
      { id: "D", text: <MathExpression>{"2f'' - 3f' + f = 0"}</MathExpression> },
      { id: "E", text: <MathExpression>{"2f'' - 3f' - f = 0"}</MathExpression> },
    ],
  },
  {
    id: 3,
    text: <MathExpression>{"\\vec{u} = (3,4),\\; \\vec{v} = (1,-2),\\; \\vec{u} \\cdot \\vec{v} = ?"}</MathExpression>,
    options: [
      { id: "A", text: "-5" },
      { id: "B", text: "5" },
      { id: "C", text: "11" },
      { id: "D", text: "-11" },
      { id: "E", text: "0" },
    ],
  },
  {
    id: 4,
    text: <MathExpression>{"\\log_2(32) + \\log_3(81) = ?"}</MathExpression>,
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "8" },
      { id: "C", text: "9" },
      { id: "D", text: "10" },
      { id: "E", text: "6" },
    ],
  },
  {
    id: 5,
    text: <MathExpression>{"រង្វង់មួយមានអង្កត់ផ្ចិត $d = 10\\;\\text{cm}$ ក្រឡាផ្ទៃរបស់វាគឺ?"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"25\\pi\\;\\text{cm}^2"}</MathExpression> },
      { id: "B", text: <MathExpression>{"50\\pi\\;\\text{cm}^2"}</MathExpression> },
      { id: "C", text: <MathExpression>{"100\\pi\\;\\text{cm}^2"}</MathExpression> },
      { id: "D", text: <MathExpression>{"10\\pi\\;\\text{cm}^2"}</MathExpression> },
      { id: "E", text: <MathExpression>{"75\\pi\\;\\text{cm}^2"}</MathExpression> },
    ],
  },
  {
    id: 6,
    text: <MathExpression>{"\\sin^2(30°) + \\cos^2(30°) = ?"}</MathExpression>,
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: <MathExpression>{"\\dfrac{1}{2}"}</MathExpression> },
      { id: "D", text: <MathExpression>{"\\dfrac{\\sqrt{3}}{2}"}</MathExpression> },
      { id: "E", text: "2" },
    ],
  },
  {
    id: 7,
    text: <MathExpression>{"\\displaystyle\\lim_{x\\to 0} \\dfrac{\\sin(x)}{x} = ?"}</MathExpression>,
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "\\infty" },
      { id: "D", text: "-1" },
      { id: "E", text: <MathExpression>{"\\text{មិនមែន}"}</MathExpression> },
    ],
  },
  {
    id: 8,
    text: <MathExpression>{"\\sqrt{x^2 + 6x + 9} \\text{ ចំពោះ } x > 0 \\text{ ស្មើនឹង?}"}</MathExpression>,
    options: [
      { id: "A", text: "x + 3" },
      { id: "B", text: "x - 3" },
      { id: "C", text: <MathExpression>{"x^2 + 3"}</MathExpression> },
      { id: "D", text: <MathExpression>{"2x + 3"}</MathExpression> },
      { id: "E", text: <MathExpression>{"\\sqrt{x^2} + 3"}</MathExpression> },
    ],
  },
  {
    id: 9,
    text: <MathExpression>{"A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix} មានច្រាស (inverse) ឬទេ?"}</MathExpression>,
    options: [
      { id: "A", text: "មាន" },
      { id: "B", text: "មិនមាន" },
      { id: "C", text: <MathExpression>{"\\text{មិនអាចកំណត់}"}</MathExpression> },
      { id: "D", text: "ស្មើសូន្យ" },
      { id: "E", text: "ស្មើមួយ" },
    ],
  },
  {
    id: 10,
    text: <MathExpression>{"5! \\text{ (5 factorial)} = ?"}</MathExpression>,
    options: [
      { id: "A", text: "20" },
      { id: "B", text: "60" },
      { id: "C", text: "120" },
      { id: "D", text: "720" },
      { id: "E", text: "24" },
    ],
  },
];

const TOTAL_TIME = EXAM_CONFIG.totalSeconds;

// ─── Countdown hook ──────────────────────────────────────────────────────────

function useTimer() {
  const [remaining, setRemaining] = useState(TOTAL_TIME);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  return {
    time: `${mins}:${secs.toString().padStart(2, "0")}`,
    percent: Math.round((remaining / TOTAL_TIME) * 100),
    isLow:
      remaining / TOTAL_TIME <= EXAM_CONFIG.lowTimeThreshold,
    isCritical:
      remaining / TOTAL_TIME <= EXAM_CONFIG.criticalTimeThreshold,
    done: remaining === 0,
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

function ExamBoardPage() {
  const navigate = useNavigate();
  const { institution, subjectId } = useParams<{ institution: string; subjectId: string }>();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("normal");
  const timer = useTimer();
  const q = QUESTIONS[index];
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;

  const isCompact = layoutMode === "compact";
  const isFull = layoutMode === "fullscreen";
  const dotSize = isCompact ? "size-6" : isFull ? "size-8" : "size-7";
  const dotGap = isCompact ? "gap-1" : isFull ? "gap-2" : "gap-2";
  const contentMaxWidth = isFull ? "max-w-none" : isCompact ? "max-w-xl" : "max-w-7xl";
  const contentPadding = isCompact ? "p-3" : isFull ? "p-6" : "p-4";
  const cardPadding = isCompact ? "p-3" : isFull ? "p-5" : "p-3";
  const cardGap = isCompact ? "gap-2" : isFull ? "gap-4" : "gap-3";
  const optionPadded = isCompact ? "p-2" : isFull ? "p-4" : "p-3";
  const optionLabelSize = isCompact ? "text-xs" : isFull ? "text-base" : "text-sm";
  const optionIdSize = isCompact ? "size-5 text-[10px]" : isFull ? "size-7 text-sm" : "size-6 text-xs";

  // Auto-submit when time runs out
  useEffect(() => {
    if (timer.done) navigate("result");
  }, [timer.done, navigate]);

  const select = (id: number, value: string) =>
    setAnswers((p) => ({ ...p, [id]: value }));

  const toggleFlag = (id: number) =>
    setFlagged((p) => ({ ...p, [id]: !p[id] }));

  const handleFinish = () => {
    if (answered < total) {
      setShowModal(true);
      return;
    }
    navigate("result");
  };

  if (!q) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ── Top bar: question dots + layout selector ── */}
      <div className="shrink-0 border-b border-border bg-background px-4 py-3">
        <div className={cn("mx-auto flex items-center gap-3", isFull ? "max-w-none px-0" : isCompact ? "max-w-xl" : "max-w-7xl")}>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            សំណួរ
          </span>
          <div className={cn("flex flex-1 items-center gap-2 overflow-x-auto", dotGap)}>
            {QUESTIONS.map((qq, i) => {
              const done = answers[qq.id] != null;
              const isFlag = flagged[qq.id];
              const active = i === index;
              return (
                <button
                  key={qq.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative flex shrink-0 items-center justify-center rounded-md text-xs font-semibold transition-all",
                    dotSize,
                    active
                      ? "bg-primary text-white shadow-sm"
                      : done
                        ? "bg-primary/15 text-primary hover:bg-primary/25"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                  )}
                >
                  {done ? <CheckCircle2 className="size-3.5" /> : qq.id}
                  {isFlag && (
                    <span className="absolute -top-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full bg-warning">
                      <Flag className="size-2 text-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {answered}/{total}
          </span>
          <Select value={layoutMode} onValueChange={(v) => setLayoutMode(v as LayoutMode)}>
            <SelectTrigger
              size="sm"
              hideChevron
              className={cn(
                "h-8 gap-1.5 border border-dashed text-muted-foreground [&>svg]:size-3.5",
                isCompact && "border-primary/40 text-primary",
                isFull && "border-primary text-primary",
              )}
            >
              <SelectValue placeholder="Layout" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="compact">
                <div className="flex items-center gap-2">
                  <Minimize className="size-3.5 text-muted-foreground" />
                  <span>Compact</span>
                </div>
              </SelectItem>
              <SelectItem value="normal">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="size-3.5 text-muted-foreground" />
                  <span>Normal</span>
                </div>
              </SelectItem>
              <SelectItem value="fullscreen">
                <div className="flex items-center gap-2">
                  <Maximize className="size-3.5 text-muted-foreground" />
                  <span>Fullscreen</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Main scrollable area ── */}
      <div className={cn("flex-1 overflow-y-auto", contentPadding)}>
        <div className={cn("mx-auto", contentMaxWidth)}>
          {/* Question card */}
          <Card>
            <CardHeader className={cn("pb-3", cardPadding)}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  សំណួរ {q.id} / {total}
                </span>
                {flagged[q.id] && (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <Flag className="size-3" /> បានសម្គាល់
                  </span>
                )}
              </div>
              <CardTitle className={cn("font-semibold leading-relaxed", isCompact ? "text-sm" : isFull ? "text-xl" : "text-base")}>
                {q.text}
              </CardTitle>
            </CardHeader>
            <CardContent className={cardPadding}>
              <RadioGroup
                value={answers[q.id]}
                onValueChange={(v) => select(q.id, v)}
                className="space-y-2"
              >
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => select(q.id, opt.id)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border-2 transition-all",
                        optionPadded,
                        selected
                          ? "border-sky-500 bg-sky-100/70 dark:bg-sky-950/60 dark:border-sky-400"
                          : "border-border hover:border-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/20",
                      )}
                    >
                      <RadioGroupItem
                        value={opt.id}
                        id={`q${q.id}-${opt.id}`}
                        className={selected ? "border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400" : ""}
                      />
                      <Label
                        htmlFor={`q${q.id}-opt-${opt.id}`}
                        className={cn("flex-1 cursor-pointer font-medium", optionLabelSize)}
                      >
                        <span className={cn(
                          "mr-2 inline-flex items-center justify-center rounded-full font-bold",
                          selected
                            ? "bg-sky-500 text-white"
                            : "bg-muted text-muted-foreground",
                          optionIdSize
                        )}>
                          {opt.id}
                        </span>
                        {opt.text}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className={cn("mt-4 flex items-center justify-between", cardGap)}>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="gap-1"
              >
                <ChevronLeft className="size-4" /> មុន
              </Button>
              <span className={cn("text-muted-foreground", isCompact ? "text-xs" : isFull ? "text-base" : "text-sm")}>
                {index + 1} / {total}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                disabled={index === total - 1}
                className="gap-1"
              >
                បន្ទាប់ <ChevronRight className="size-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFlag(q.id)}
              className={cn(
                "gap-1",
                flagged[q.id] && "text-primary",
                isCompact ? "text-xs" : isFull ? "text-base" : "",
              )}
            >
              <Flag className="size-4" />
              {flagged[q.id] ? "បានសម្គាល់" : "សម្គាល់"}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={cn("shrink-0 border-t border-border bg-background", isFull ? "px-6 py-4" : "px-4 py-3")}>
        <div className={cn("mx-auto flex items-center justify-between gap-4", isFull ? "max-w-none" : isCompact ? "max-w-xl" : "max-w-7xl")}>
          {/* Timer */}
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  timer.isCritical
                    ? "bg-destructive"
                    : timer.isLow
                      ? "bg-warning"
                      : "bg-primary",
                )}
                style={{ width: `${timer.percent}%` }}
              />
            </div>
            <span
              className={cn(
                "text-xs font-semibold tabular-nums",
                timer.isCritical
                  ? "text-destructive"
                  : timer.isLow
                    ? "text-warning"
                    : "text-muted-foreground",
              )}
            >
              {timer.time}
            </span>
          </div>

          {/* Stats + Finish */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              ចម្លើយ {answered}/{total}
            </span>
            <Button size="sm" onClick={handleFinish} className="gap-1 bg-primary hover:bg-primary/90">
              <CheckCircle2 className="size-4" />
              បញ្ចប់
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (institution && subjectId ? navigate(`/exam/${institution}/${subjectId}`) : navigate(-1))}
              className="gap-1 text-muted-foreground"
            >
              <X className="size-4" /> ចាកចេញ
            </Button>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="size-5 text-warning" />
                រោយពិនិត្យម្តងទៀត
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                អ្នកមាន{" "}
                <span className="font-semibold text-foreground">
                  {total - answered}
                </span>{" "}
                សំណួរដែលមិនទាន់ចម្លើយ។ តើអ្នកចង់បន្តឬទេ?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  បន្តចម្លើយ
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowModal(false);
                    navigate("result");
                  }}
                >
                  បញ្ជាក់
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default ExamBoardPage;
