import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Plus",
    description: "Ideal para un abogado",
    pricing: "699",
    popular: true,
    features: [
      "Hasta 10 Expertos",
      "Hasta 100 Chats",
      "5GB de almacenamiento",
      "Funciones de IA estándar",
    ],
  },
  {
    name: "Team Pro",
    description: "Ideal para un despacho de abogados",
    pricing: "4999",
    popular: false,
    features: [
      "Hasta 100 Expertos",
      "Hasta 1000 Chats",
      "50GB de almacenamiento",
      "Funciones de IA avanzadas",
    ],
  },
];

export default function PlansPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <section className="w-full max-w-4xl mx-auto py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Elige el plan perfecto para ti
          </h2>
          <p className="text-muted-foreground mt-2">
            Escala según tus necesidades.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={plan.popular ? `border-primary border-2 relative` : ""}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 w-full text-center">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-4xl font-bold">${plan.pricing}</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Elegir {plan.name}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
