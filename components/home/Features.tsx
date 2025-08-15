import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, BrainCircuit, FileText } from "lucide-react";

const featuresData = [
  {
    icon: <FolderKanban className="h-10 w-10 text-primary" />,
    title: "Organización de Casos por Carpetas",
    description:
      "Centraliza todos tus documentos, notas y evidencias en carpetas intuitivas por cada caso. Acceso rápido y seguro desde cualquier lugar.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "Consultas con IA Especializada",
    description:
      "Haz preguntas en lenguaje natural sobre tus documentos. Nuestra IA, entrenada en derecho, encuentra la información precisa que necesitas en segundos.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Resúmenes y Redacción Inteligente",
    description:
      "Genera resúmenes ejecutivos de expedientes complejos y borradores de escritos legales. Acelera tu flujo de trabajo y reduce errores.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-5 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Una herramienta, todo el control
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diseñado por abogados, para abogados. Todo lo que necesitas para una
            práctica legal más eficiente.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <Card key={feature.title} className="text-center p-6">
              <CardHeader className="flex items-center justify-center">
                {feature.icon}
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold mb-2">
                  {feature.title}
                </CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
