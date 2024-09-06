import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { ReactSelectProps } from "../types/fieldsTypes";
import { ErrorMessage } from "@hookform/error-message";

// Select Input using React Select library
export const ReactSelectInput: FC<ReactSelectProps> = ({
  name,
  label,
  errors,
  options,
  isMulti,
}) => {
  const { control } = useFormContext();
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => (
            <ReactSelect
              isMulti={isMulti}
              onChange={onChange}
              options={options}
              classNames={{
                control: (state) =>
                  `form__input py-[2.5px]  ${
                    Object.prototype.hasOwnProperty.call(errors, name) &&
                    !state.isFocused &&
                    "!border-2 !border-red-500"
                  } `,
              }}
            />
          )}
        />
      </div>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
