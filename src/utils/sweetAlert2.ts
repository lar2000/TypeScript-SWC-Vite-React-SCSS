import Swal from "sweetalert2";
import type { SweetAlertResult } from "sweetalert2";
import { toast } from "react-toastify";

// ======================= SweetAlert =======================

export const alertSuccess = (title: string, text: string): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "ຕົກລົງ",
  });
};

export const alertError = (title: string, text: string): Promise<SweetAlertResult> => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "ຕົກລົງ",
  });
};

export const alertConfirm = (
  title: string = "ຢືນຢັນການລຶບ",
  text: string = "ທ່ານແນ່ໃຈບໍ່?"
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ລຶບ",
    cancelButtonText: "ຍົກເລີກ",
  });
};

// ======================= Toast Notification =======================

export const notifySuccess = (message: string): void => {
  toast.success(message);
};

export const notifyError = (message: string): void => {
  toast.error(message);
};

export const notifyInfo = (message: string): void => {
  toast.info(message);
};

export const notifyWarning = (message: string): void => {
  toast.warning(message);
};
