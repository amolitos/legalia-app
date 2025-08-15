import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Scale } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2 font-bold text-xl">
          <Scale className="h-6 w-6 text-primary" />
          <span>LexiCore</span>
        </a>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-primary transition-colors">
            Características
          </a>
          <a
            href="#how-it-works"
            className="hover:text-primary transition-colors"
          >
            Cómo Funciona
          </a>
          <a
            href="#testimonials"
            className="hover:text-primary transition-colors"
          >
            Testimonios
          </a>
          <a href="#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Iniciar Sesión</Button>
          <Button>Empezar Gratis</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 py-6">
              <a
                href="#"
                className="flex items-center gap-2 font-bold text-xl mb-4"
              >
                <Scale className="h-6 w-6 text-primary" />
                <span>LexiCore</span>
              </a>
              <a
                href="#features"
                className="font-medium hover:text-primary transition-colors"
              >
                Características
              </a>
              <a
                href="#how-it-works"
                className="font-medium hover:text-primary transition-colors"
              >
                Cómo Funciona
              </a>
              <a
                href="#testimonials"
                className="font-medium hover:text-primary transition-colors"
              >
                Testimonios
              </a>
              <a
                href="#faq"
                className="font-medium hover:text-primary transition-colors"
              >
                FAQ
              </a>
              <div className="flex flex-col gap-4 mt-4">
                <Button variant="ghost">Iniciar Sesión</Button>
                <Button>Empezar Gratis</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
