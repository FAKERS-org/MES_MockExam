import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Dummy data for the 5 options based on the image context
const quizOptions = [
  { id: "A", equation: "f'' - 3f' + 2f = 0" },
  { id: "B", equation: "2f'' + 3f' + f = 0" },
  { id: "C", equation: "f'' - 3f' - 2f = 0" },
  { id: "D", equation: "2f'' - 3f' + f = 0" }, // Correct/Selected option
  { id: "E", equation: "2f'' - 3f' - f = 0" },
];

export default function QuizBoard() {
  // Default to "D" as shown selected in the image
  const [selectedAnswer, setSelectedAnswer] = useState<string>("D");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-8">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              คำถามปรนัย
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              เลือกคำตอบที่ถูกต้องเพียง 1 ข้อ
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Question Text */}
          <div className="mb-8 text-lg font-medium leading-relaxed text-gray-800">
            ฟังก์ชัน <MathExpression>f(x) = 3eˣ - 2e²ˣ</MathExpression> สอดคล้องกับสมการเชิงอนุพันธ์ใด
          </div>

          {/* Options */}
          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            className="space-y-3"
          >
            {quizOptions.map((option) => {
              const isSelected = selectedAnswer === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedAnswer(option.id)}
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`option-${option.id}`}
                    className={isSelected ? "border-primary text-primary" : ""}
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="flex-1 cursor-pointer text-base text-gray-700"
                  >
                    <span className="font-semibold mr-2">{option.id}.</span>
                    <MathExpression>{option.equation}</MathExpression>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4">
          <span className="text-sm font-semibold text-gray-500">3/30</span>
          <Button size="lg" className="px-8">
            ยืนยัน
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/**
 * Simple wrapper component to render math text with proper styling.
 * In a real app, you might want to use a library like KaTeX 
 * to render the formulas properly.
 */
function MathExpression({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic">{children}</span>;
}