import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Flag,
  X,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EXAM_CONFIG } from "@/config/exam.config";

// ─── Question data ───────────────────────────────────────────────────────────

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "ម៉ាទ្រីស A = [[1,2],[3,4]] មាន determinant ស្មើនឹង?",
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
    text: "f(x) = 3e^x - 2e^(2x) ជាចម្លើយនៃសមីការឌីផេរ៉ង់ស្យែលណា?",
    options: [
      { id: "A", text: "f'' - 3f' + 2f = 0" },
      { id: "B", text: "2f'' + 3f' + f = 0" },
      { id: "C", text: "f'' - 3f' - 2f = 0" },
      { id: "D", text: "2f'' - 3f' + f = 0" },
      { id: "E", text: "2f'' - 3f' - f = 0" },
    ],
  },
  {
    id: 3,
    text: "វ៉ិចទ័រ u=(3,4) និង v=(1,-2) មាន dot product ស្មើនឹង?",
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
    text: "log_2(32) + log_3(81) = ?",
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
    text: "ផ្ទៃរង្វង់ដែលមានអង្កត់ផ្ចិត 10 cm គឺ?",
    options: [
      { id: "A", text: "25π cm²" },
      { id: "B", text: "50π cm²" },
      { id: "C", text: "100π cm²" },
      { id: "D", text: "10π cm²" },
      { id: "E", text: "75π cm²" },
    ],
  },
  {
    id: 6,
    text: "sin²(30°) + cos²(30°) = ?",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "1/2" },
      { id: "D", text: "√3/2" },
      { id: "E", text: "2" },
    ],
  },
  {
    id: 7,
    text: "lim(x→0) sin(x)/x = ?",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "∞" },
      { id: "D", text: "-1" },
      { id: "E", text: "មិនមែន" },
    ],
  },
  {
    id: 8,
    text: "√(x² + 6x + 9) ចំពោះ x > 0 ស្មើនឹង?",
    options: [
      { id: "A", text: "x + 3" },
      { id: "B", text: "x - 3" },
      { id: "C", text: "x² + 3" },
      { id: "D", text: "2x + 3" },
      { id: "E", text: "√(x²) + 3" },
    ],
  },
  {
    id: 9,
    text: "ម៉ាទ្រីស [[2,1],[1,1]] មាន inverse ឬទេ?",
    options: [
      { id: "A", text: "មាន" },
      { id: "B", text: "មិនមាន" },
      { id: "C", text: "មិនអាចកំណត់" },
      { id: "D", text: "ស្មើសូន្យ" },
      { id: "E", text: "ស្មើមួយ" },
    ],
  },
  {
    id: 10,
    text: "តើចំនួនប៉ាន់ 5! (5 ហ្វាក់ទូរ) ស្មើនឹង?",
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
  const { subjectId } = useParams<{ subjectId: string }>();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const timer = useTimer();
  const q = QUESTIONS[index];
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).length;

  // Auto-submit when time runs out
  useEffect(() => {
    if (timer.done) navigate(`/dashboard/${subjectId}/take/result`);
  }, [timer.done]);

  const select = (id: number, value: string) =>
    setAnswers((p) => ({ ...p, [id]: value }));

  const toggleFlag = (id: number) =>
    setFlagged((p) => ({ ...p, [id]: !p[id] }));

  const handleFinish = () => {
    if (answered < total) {
      setShowModal(true);
      return;
    }
    navigate(`/dashboard/${subjectId}/take/result`);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ── Top bar: question dots ── */}
      <div className="shrink-0 border-b border-border bg-muted/20 px-4 py-2.5">
        <div className="mx-auto flex max-w-2xl items-center gap-1.5 overflow-x-auto scrollbar-hide">
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
                  "relative flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                  active
                    ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1 ring-offset-background"
                    : done
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {done ? <CheckCircle2 className="size-4" /> : qq.id}
                {isFlag && (
                  <span className="absolute -top-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full bg-warning">
                    <Flag className="size-2 text-warning-foreground" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main scrollable area ── */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl">
          {/* Question card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  សំណួរ {q.id} / {total}
                </span>
                {flagged[q.id] && (
                  <span className="flex items-center gap-1 text-xs text-warning">
                    <Flag className="size-3" /> បានសម្គាល់
                  </span>
                )}
              </div>
              <CardTitle className="text-base font-semibold leading-relaxed">
                {q.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                        "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-all",
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
                      )}
                    >
                      <RadioGroupItem
                        value={opt.id}
                        id={`q${q.id}-${opt.id}`}
                        className={selected ? "border-primary text-primary" : ""}
                      />
                      <Label
                        htmlFor={`q${q.id}-opt-${opt.id}`}
                        className="flex-1 cursor-pointer text-sm font-medium"
                      >
                        <span className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
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
          <div className="mt-4 flex items-center justify-between">
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
              <span className="text-sm text-muted-foreground">
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
                flagged[q.id] && "text-warning",
              )}
            >
              <Flag className="size-4" />
              {flagged[q.id] ? "បានសម្គាល់" : "សម្គាល់"}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="shrink-0 border-t border-border bg-background px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
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
            <Button size="sm" onClick={handleFinish} className="gap-1">
              <CheckCircle2 className="size-4" />
              បញ្ចប់
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
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
                    navigate(`/dashboard/${subjectId}/take/result`);
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
