import { FieldErrors } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?: "text" | "email" | "time" | "password";
  placeholder?: string;
  errors?: FieldErrors;
}

interface SelectProps extends InputProps {
  options: {
    value: string;
    label: string;
  }[];
}

interface ReactSelectProps extends SelectProps {
  isMulti: boolean;
}

export type { InputProps, SelectProps, ReactSelectProps };
