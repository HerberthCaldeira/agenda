import { FieldErrors } from "react-hook-form";

interface ErrorValidationMessageProps {
  field: string;
  errors?: FieldErrors;
}
/**
 * @deprecated
 * new:: import { ErrorMessage } from "@hookform/error-message"
 */
export default function ErrorValidationMessage({
  errors,
  field,
}: ErrorValidationMessageProps) {
  console.log("ErrorValidationMessage", errors, field, errors?.[field]);

  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  const msg = errors?.[field]?.message || null;

  return msg ? <div>{msg}</div> : null;
}
