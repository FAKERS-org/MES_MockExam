import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, ArrowLeft } from "lucide-react";

function ExamResultPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 py-12">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <CardHeader className="border-b border-border bg-muted/30 pb-6 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            បញ្ចប់កការប្រលង!
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            អ្នកបានបញ្ជាក់ចម្លើយរួចរាល់
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/40 p-4">
              <span className="text-2xl font-bold text-primary">8/10</span>
              <span className="text-xs text-muted-foreground">ចម្លើយត្រូវ</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/40 p-4">
              <span className="text-2xl font-bold text-destructive">2/10</span>
              <span className="text-xs text-muted-foreground">ចម្លើយខុស</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/40 p-4">
              <span className="text-2xl font-bold text-foreground">80%</span>
              <span className="text-xs text-muted-foreground">ពិន្ទុ</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>ចំណាយពេល: 45 នាទី</span>
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 size-4" />
              ត្រឡប់
            </Button>
            <Button className="flex-1" onClick={() => navigate("/dashboard")}>
              ត្រឡប់ទៅ Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExamResultPage;
