"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { InputError } from "../InputError";
import { CustomError } from "../CustomError";
import { Expert } from "@/lib/types";
import { useCreateOrUpdateExpert } from "@/hooks/useExpert";

export const ExpertForm = ({ expert }: { expert?: Expert }) => {
  const router = useRouter();
  const isNewExpert = !expert;
  const { saveExpert, isLoading, error } = useCreateOrUpdateExpert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Expert>({
    defaultValues: {
      name: expert?.name || "",
      role: expert?.role || "",
      instructions: expert?.instructions || "",
    },
  });

  const handleSubmitExpert: SubmitHandler<Expert> = async (data) => {
    if (isNewExpert) {
      const res = await saveExpert(data);
      router.push(`/experts/${res!.id}`);
      return;
    }
    await saveExpert(data, expert!.id);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitExpert)}
      className="flex flex-col gap-3"
    >
      {error && (
        <CustomError
          message={error.message}
          handleRetry={handleSubmit(handleSubmitExpert)}
        />
      )}
      <div>
        <Label htmlFor="name" className="mb-1">
          Nombre
        </Label>
        <Input
          {...register("name", {
            required: "Ingresa el nombre del experto",
          })}
          id="name"
          name="name"
          type="text"
        />
        {errors.name?.message && (
          <InputError message={errors.name.message.toString()} />
        )}
      </div>
      <div>
        <Label htmlFor="role" className="mb-1">
          Rol
        </Label>
        <Input
          {...register("role", { required: "Ingresa un rol" })}
          id="role"
          name="role"
          type="text"
        />
        {errors.role?.message && (
          <InputError message={errors.role.message.toString()} />
        )}
      </div>
      <div>
        <Label htmlFor="instructions" className="mb-1">
          Instrucciones
        </Label>
        <Textarea
          {...register("instructions", {
            required: "Ingresa las instrucciones",
          })}
          id="instructions"
          name="instructions"
          rows={8}
          className="resize-none"
        />
        {errors.instructions?.message && (
          <InputError message={errors.instructions.message.toString()} />
        )}
      </div>
      <div className="mt-2">
        <Button type="submit" disabled={isLoading}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
