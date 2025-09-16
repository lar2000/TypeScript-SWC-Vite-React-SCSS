// utils/validate.ts
import { Schema } from "rsuite";

const { StringType, NumberType, DateType } = Schema.Types;

/**
 * Helper สำหรับ required field พร้อม option เพิ่มเติม (min/max)
 */
export function requiredField(
  message: string,
  type: "string" | "email" | "number" | "date" = "string",
  options?: { min?: number; max?: number }
) {
  switch (type) {
    case "email": {
      let validator = StringType().isRequired(message).isEmail("ອີເມວບໍ່ຖືກຕ້ອງ.");
      if (options?.min) validator = validator.minLength(options.min, `ຕ້ອງມີຢ່າງໜ້ອຍ ${options.min} ຕົວອັກສອນ.`);
      if (options?.max) validator = validator.maxLength(options.max, `ຕ້ອງມີຕົວອັກສອນບໍ່ເກີນ ${options.max}.`);
      return validator;
    }
    case "string": {
      let validator = StringType().isRequired(message);
      if (options?.min) validator = validator.minLength(options.min, `ຕ້ອງມີຢ່າງໜ້ອຍ ${options.min} ຕົວອັກສອນ.`);
      if (options?.max) validator = validator.maxLength(options.max, `ຕ້ອງມີຕົວອັກສອນບໍ່ເກີນ ${options.max}.`);
      return validator;
    }
    case "number": {
      let validator = NumberType().isRequired(message);
      if (options?.min !== undefined) validator = validator.min(options.min, `ຕ້ອງມີຢ່າງໜ້ອຍ ${options.min} ຕົວ.`);
      if (options?.max !== undefined) validator = validator.max(options.max, `ຕ້ອງມີຕົວເລກບໍ່ເກີນ ${options.max}.`);
      return validator;
    }
    case "date": {
      let validator = DateType().isRequired(message);
      if (options?.min !== undefined) validator = validator.min(new Date(options.min), `ວັນທີຕ້ອງແມ່ນຫຼັງຈາກ ${options.min}`);
      if (options?.max !== undefined) validator = validator.max(new Date(options.max), `ວັນທີຕ້ອງແມ່ນກ່ອນ ${options.max}`);
      return validator;
    }
    default:
      return StringType().isRequired(message);
  }
}

/**
 * Generic schema factory
 */
export function createModel<T extends object>(
  fields: Parameters<typeof Schema.Model<T>>[0]
) {
  return Schema.Model<T>(fields);
}