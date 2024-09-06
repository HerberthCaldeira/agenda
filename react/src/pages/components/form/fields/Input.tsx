import { useFormContext } from "react-hook-form";
import { InputProps } from "./types/fieldsTypes";

import { ErrorMessage } from "@hookform/error-message";

export default function Input({
  name,
  label,
  type,
  placeholder,
  errors,
}: InputProps) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="">
        {label}
      </label>
      <input type={type} placeholder={placeholder} {...register(name)} />

      <ErrorMessage errors={errors} name={name} />
    </div>
  );
}
