import { Card, CardContent } from "@/components/ui/card";

const testimonialsData = [
  {
    quote:
      "LexiCore ha cambiado las reglas del juego. Ahorro al menos 10 horas a la semana en investigación. Es como tener un asistente legal superdotado.",
    name: "Lic. Ana Torres",
    title: "Socia en Torres & Asociados",
  },
  {
    quote:
      "La capacidad de hacer preguntas directas a mis expedientes y obtener respuestas instantáneas es simplemente increíble. No puedo imaginar volver a trabajar sin esta herramienta.",
    name: "Lic. Carlos Herrera",
    title: "Abogado Penalista",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-5 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Lo que dicen nuestros usuarios
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent>
                <blockquote className="italic text-neutral-600 border-l-4 pl-4">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <p className="font-semibold mt-6">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
