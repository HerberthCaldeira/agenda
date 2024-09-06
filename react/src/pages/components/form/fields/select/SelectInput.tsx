import { FC } from "react";
import { useFormContext } from "react-hook-form";
import ErrorValidationMessage from "../../ErrorValidationMessage";
import { SelectProps } from "../types/fieldsTypes";

export const SelectInput: FC<SelectProps> = ({
  name,
  errors,
  label,
  options,
}) => {
  const { register } = useFormContext();
  return (
    <div>
      <div>
        <label htmlFor={name} className="">
          {label}
        </label>
        <select {...register(name)}>
          <option value="">{label}</option>
          {options.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <ErrorValidationMessage field={name} errors={errors} />
    </div>
  );
};
