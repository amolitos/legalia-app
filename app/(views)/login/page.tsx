import GoogleButton from "@/components/GoogleButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Login() {
  return (
    <div className="relative bg-gradient-to-r from-slate-100 to-blue-100 flex items-center justify-center min-h-screen p-8">
      <Card className="w-full md:w-2/3 lg:w-1/3">
        <CardHeader>
          <div className="bg-black rounded-full mx-auto p-4">
            <Lock size={35} className="text-white" />
          </div>
          <CardTitle className="font-bold text-3xl text-center">
            Bienvenido a {APP_NAME}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-neutral-600">Ingresa para analizar casos</p>
          <div className="grid mt-6">
            <GoogleButton />
          </div>
          <p className="text-sm text-neutral-600 mt-3">
            Al iniciar sesión, aceptas nuestros{" "}
            <Link href="/terms" className="font-medium text-blue-600">
              Terminos de servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="font-medium text-blue-600">
              Politica de privacidad
            </Link>
          </p>
        </CardContent>
      </Card>
      <Image
        src="/uniceba.png"
        alt="Image"
        width={400}
        height={400}
        className="absolute bottom-10 left-0 hidden md:block"
      ></Image>
      <Image
        src="/login.png"
        alt="Image"
        width={300}
        height={300}
        className="absolute bottom-0 right-0 hidden md:block"
      ></Image>
    </div>
  );
}
