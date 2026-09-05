import { MathExpression } from "@/components/ui/math-expression";
import type { ReactNode } from "react";

export interface QuestionOption {
  id: string;
  text: ReactNode;
}

export interface Question {
  id: number;
  text: ReactNode;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: <MathExpression>{"A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix},\\; \\det(A) = ?"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"{-}2"}</MathExpression> },
      { id: "B", text: <MathExpression>{"2"}</MathExpression> },
      { id: "C", text: <MathExpression>{"{-}1"}</MathExpression> },
      { id: "D", text: <MathExpression>{"1"}</MathExpression> },
      { id: "E", text: <MathExpression>{"0"}</MathExpression> },
    ],
  },
  {
    id: 2,
    text: <MathExpression>{"f(x) = 3e^{x} - 2e^{2x} \\; ជាកំណត់សមីការឌីផេរ៉ង់ស្យែលណា?"}</MathExpression>,
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
      { id: "A", text: <MathExpression>{"{-}5"}</MathExpression> },
      { id: "B", text: <MathExpression>{"5"}</MathExpression> },
      { id: "C", text: <MathExpression>{"11"}</MathExpression> },
      { id: "D", text: <MathExpression>{"{-}11"}</MathExpression> },
      { id: "E", text: <MathExpression>{"0"}</MathExpression> },
    ],
  },
  {
    id: 4,
    text: <MathExpression>{"\\log_2(32) + \\log_3(81) = ?"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"7"}</MathExpression> },
      { id: "B", text: <MathExpression>{"8"}</MathExpression> },
      { id: "C", text: <MathExpression>{"9"}</MathExpression> },
      { id: "D", text: <MathExpression>{"10"}</MathExpression> },
      { id: "E", text: <MathExpression>{"6"}</MathExpression> },
    ],
  },
  {
    id: 5,
    text: <MathExpression>{"រង្វង់មួយមានអង្កត់ផ្ចិត \\; d = 10\\;\\text{cm} \\; \\text{ក្រឡាផ្ទៃរបស់វាគឺ?}"}</MathExpression>,
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
      { id: "A", text: <MathExpression>{"0"}</MathExpression> },
      { id: "B", text: <MathExpression>{"1"}</MathExpression> },
      { id: "C", text: <MathExpression>{"\\dfrac{1}{2}"}</MathExpression> },
      { id: "D", text: <MathExpression>{"\\dfrac{\\sqrt{3}}{2}"}</MathExpression> },
      { id: "E", text: <MathExpression>{"2"}</MathExpression> },
    ],
  },
  {
    id: 7,
    text: <MathExpression>{"\\displaystyle\\lim_{x\\to 0} \\dfrac{\\sin(x)}{x} = ?"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"0"}</MathExpression> },
      { id: "B", text: <MathExpression>{"1"}</MathExpression> },
      { id: "C", text: <MathExpression>{"\\infty"}</MathExpression> },
      { id: "D", text: <MathExpression>{"{-}1"}</MathExpression> },
      { id: "E", text: <MathExpression>{"\\text{មិនមែន}"}</MathExpression> },
    ],
  },
  {
    id: 8,
    text: <MathExpression>{"\\sqrt{x^2 + 6x + 9} \\; \\text{ចំពោះ } x > 0 \\; \\text{ស្មើនឹង?}"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"x + 3"}</MathExpression> },
      { id: "B", text: <MathExpression>{"x - 3"}</MathExpression> },
      { id: "C", text: <MathExpression>{"x^2 + 3"}</MathExpression> },
      { id: "D", text: <MathExpression>{"2x + 3"}</MathExpression> },
      { id: "E", text: <MathExpression>{"\\sqrt{x^2} + 3"}</MathExpression> },
    ],
  },
  {
    id: 9,
    text: <MathExpression>{"A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix} \\; \\text{មានច្រាស (inverse) ឬទេ?}"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"\\text{មាន}"}</MathExpression> },
      { id: "B", text: <MathExpression>{"\\text{មិនមាន}"}</MathExpression> },
      { id: "C", text: <MathExpression>{"\\text{មិនអាចកំណត់}"}</MathExpression> },
      { id: "D", text: <MathExpression>{"\\text{ស្មើសូន្យ}"}</MathExpression> },
      { id: "E", text: <MathExpression>{"\\text{ស្មើមួយ}"}</MathExpression> },
    ],
  },
  {
    id: 10,
    text: <MathExpression>{"5! \\; \\text{(5 factorial)} = ?"}</MathExpression>,
    options: [
      { id: "A", text: <MathExpression>{"20"}</MathExpression> },
      { id: "B", text: <MathExpression>{"60"}</MathExpression> },
      { id: "C", text: <MathExpression>{"120"}</MathExpression> },
      { id: "D", text: <MathExpression>{"720"}</MathExpression> },
      { id: "E", text: <MathExpression>{"24"}</MathExpression> },
    ],
  },
];
