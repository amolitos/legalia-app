import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { AudioLines, FileText, Presentation, Scale } from "lucide-react";

const features = [
  {
    name: "Generar documento",
    color: "bg-blue-100",
    icon: <FileText size={30} />,
  },
  {
    name: "Resumen de audio",
    color: "bg-green-100",
    icon: <AudioLines size={30} />,
  },
  {
    name: "Crear presentación",
    color: "bg-red-100",
    icon: <Presentation size={30} />,
  },
  {
    name: "Simular debate",
    color: "bg-yellow-100",
    icon: <Scale size={30} />,
  },
];

export const ChatFeatures = () => {
  return (
    <Card className="gap-3">
      <CardHeader className="font-semibold">Funciones avanzadas</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {features.map((ff, index) => (
            <div
              key={index}
              className={`${ff.color} rounded-lg cursor-pointer py-6 px-3`}
            >
              <div className="w-fit mx-auto mb-2">{ff.icon}</div>
              <p className="font-medium text-center text-black select-none">
                {ff.name}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
