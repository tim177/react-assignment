import { Counter } from "@/components/counter";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CounterPage() {
  return (
    <div className="flex-1 space-y-4">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">
            Power Level Counter
          </CardTitle>
          <CardDescription className="text-lg">
            Control the cosmic energy levels. How high can you go?
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="mx-auto max-w-3xl">
        <Counter />
      </div>
    </div>
  );
}
