import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="aurora"></div>
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={550}
            height={550}
            priority
            className="mx-auto"
          ></Image>
          <h2 className="text-6xl text-shadow-md mt-8">
            Analiza casos con inteligencia artificial.
          </h2>
          <div className="mt-8">
            <Button asChild size="lg" className="font-semibold text-lg py-6">
              <Link href="/login">Empezar</Link>
            </Button>
          </div>
          <div className="mt-8">
            <span>¿Ya tienes cuenta?</span>
            <Link href="/login" className="text-neutral-700 underline">
              Ingresa aquí
            </Link>
          </div>
        </div>
      </div>
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
