import { Scale } from "lucide-react";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const Footer = () => {
  return (
    <footer className="w-full bg-primary text-slate-300 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <a
            href="#"
            className="flex items-center gap-2 font-bold text-xl text-white mb-4"
          >
            <Scale className="h-6 w-6" />
            <span>{APP_NAME}</span>
          </a>
          <p className="text-sm">Potenciando la práctica legal del futuro.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-white mb-2">Legal</h4>
          <a href="#" className="hover:text-white transition-colors">
            Términos de Servicio
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Política de Privacidad
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-white mb-2">Contacto</h4>
          <a href="#" className="lowercase hover:text-white transition-colors">
            soporte@{APP_NAME}.com
          </a>
          <a href="#" className="hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 border-t border-slate-700 pt-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
