import type { FormControlProps } from "rsuite";
import { Form, InputGroup } from "rsuite";
import type { ReactNode } from "react";

export interface PickerDataItem<T = string | number> {
  label: string;
  value: T;
}

export interface TextFieldProps extends FormControlProps {
  name: string;
  label: string;
  accepter?: React.ElementType;
  size?: string;
  block?: boolean;
  data?: PickerDataItem[]; // for SelectPicker
  oneTap?: boolean; // for DatePicker
  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

export function InputField({
  name,
  label,
  size,
  block,
  icon,
  data,
  oneTap,
  placeholder,
  accepter,
  iconPosition = "start",
  ...rest
}: TextFieldProps) {
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel className="fs-5">
        {label}
        <span className="text-danger">*</span>
      </Form.ControlLabel>
      {icon ? (
        <InputGroup inside>
          {iconPosition === "start" && (
            <InputGroup.Addon>{icon}</InputGroup.Addon>
          )}
          <Form.Control
            name={name}
            accepter={accepter}
            {...rest}
            size={size}
            block={block}
            data={data} // ✅ for SelectPicker
            oneTap={oneTap} // ✅ for DatePicker
            placeholder={placeholder}
          />
          {iconPosition === "end" && (
            <InputGroup.Addon>{icon}</InputGroup.Addon>
          )}
        </InputGroup>
      ) : (
        <Form.Control
          name={name}
          accepter={accepter}
          {...rest}
          size={size}
          block={block}
          data={data}
          oneTap={oneTap}
          placeholder={placeholder}
        />
      )}
    </Form.Group>
  );
}
