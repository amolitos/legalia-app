import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "¿Es segura mi información?",
    answer:
      "Absolutamente. Utilizamos encriptación de extremo a extremo y seguimos los más altos estándares de seguridad de la industria para proteger la confidencialidad de tus casos.",
  },
  {
    question: "¿En qué tipo de documentos funciona la IA?",
    answer:
      "Nuestra IA está optimizada para analizar una amplia gama de formatos, incluyendo PDF, DOCX, TXT, y más. Puedes subir expedientes completos, contratos, sentencias, y cualquier documento legal relevante.",
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer:
      "Sí, puedes cancelar tu plan en cualquier momento sin penalizaciones. Seguirás teniendo acceso a tus datos hasta el final de tu ciclo de facturación.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-5 md:py-14">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Preguntas Frecuentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-lg font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
