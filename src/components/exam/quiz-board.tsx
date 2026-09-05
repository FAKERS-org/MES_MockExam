import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MathExpression } from "@/components/ui/math-expression";
import { DEFAULT_QUIZ_OPTIONS } from "@/data/quiz-defaults";

export interface QuizOption {
  id: string;
  text: React.ReactNode;
}

export interface QuizBoardProps {
  questionTypeLabel?: React.ReactNode;
  instructionLabel?: React.ReactNode;
  questionText?: React.ReactNode;
  options?: QuizOption[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  progressText?: React.ReactNode;
  submitButtonText?: React.ReactNode;
  onSubmit?: () => void;
  className?: string;
}

const defaultOptions = DEFAULT_QUIZ_OPTIONS;

export default function QuizBoard({
  questionTypeLabel = "Multiple Choice",
  instructionLabel = "Select 1 correct answer",
  questionText = (
    <MathExpression displayMode>{"f(x) = 3e^{x} - 2e^{2x} \\; \\text{is a solution to which differential equation?}"}</MathExpression>
  ),
  options = defaultOptions,
  selectedValue: controlledValue,
  onValueChange,
  progressText = "3/30",
  submitButtonText = "Confirm",
  onSubmit,
  className,
}: QuizBoardProps) {
  const [internalValue, setInternalValue] = useState<string>("D");
  const selectedAnswer = controlledValue ?? internalValue;

  const handleSelect = (val: string) => {
    if (onValueChange) {
      onValueChange(val);
    } else {
      setInternalValue(val);
    }
  };

  return (
    <div className={cn("flex min-h-screen items-center justify-center p-4 sm:p-8", className)}>
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {questionTypeLabel}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {instructionLabel}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Question Text */}
          <div className="mb-8 text-lg font-medium leading-relaxed text-foreground">
            {questionText}
          </div>

          {/* Options */}
          <RadioGroup
            value={selectedAnswer}
            onValueChange={handleSelect}
            className="space-y-3"
          >
            {options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    "flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={`option-${option.id}`}
                    className={isSelected ? "border-primary text-primary" : ""}
                  />
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="flex-1 cursor-pointer text-base text-foreground"
                  >
                    <span className="mr-2 font-semibold">{option.id}.</span>
                    {option.text}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4">
          <span className="text-sm font-semibold text-muted-foreground">{progressText}</span>
          <Button size="lg" className="px-8" onClick={onSubmit}>
            {submitButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}