import { MathExpression } from "@/components/ui/math-expression";

export interface QuizOption {
  id: string;
  text: React.ReactNode;
}

export const DEFAULT_QUIZ_OPTIONS: QuizOption[] = [
  { id: "A", text: <MathExpression>{"f'' - 3f' + 2f = 0"}</MathExpression> },
  { id: "B", text: <MathExpression>{"2f'' + 3f' + f = 0"}</MathExpression> },
  { id: "C", text: <MathExpression>{"f'' - 3f' - 2f = 0"}</MathExpression> },
  { id: "D", text: <MathExpression>{"2f'' - 3f' + f = 0"}</MathExpression> },
  { id: "E", text: <MathExpression>{"2f'' - 3f' - f = 0"}</MathExpression> },
];
