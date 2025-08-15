"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { InputError } from "../InputError";
import { CustomError } from "../CustomError";
import { useCreateExpert } from "@/hooks/experts/create";

export const ExpertForm = () => {
  const { loading, error, handleSubmitExpert } = useCreateExpert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(handleSubmitExpert)}
      className="flex flex-col gap-3"
    >
      <h4 className="font-bold text-2xl mb-3">Nuevo Experto</h4>
      {error && (
        <CustomError
          message={error}
          handleRetry={handleSubmit(handleSubmitExpert)}
        />
      )}
      <div className="mt-3">
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
      <div className="mt-3">
        <Button type="submit" disabled={loading}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
