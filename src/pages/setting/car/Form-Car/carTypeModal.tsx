import { useRef, useState } from "react";
import { Modal, Input, Button, Form, Loader } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../../../utils/inputFields'
import { createModel, requiredField } from '../../../../utils/validate'

interface CarItem {
  id?: number | string;
  car_type_name_la: string;
  car_type_name_en: string;
}

interface CarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: CarItem;
  setInputs: React.Dispatch<React.SetStateAction<CarItem>>;
}

const C_Type_model = createModel<CarItem>({
  car_type_name_la: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  car_type_name_en: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
});

export default function ModalForm({ open, setOpen, inputs, setInputs }: CarModalProps) {

    const [isLoading, setLoading] = useState(false);

    const handleClose = () => {
        setInputs({} as CarItem);
        setOpen(false);
    };

    const formRef = useRef<FormInstance>(null);
    const handleSubmit = () => {
        if (!formRef.current?.check()) {
        return; // ❌ validation failed
        }
        setLoading(true);
        console.log("inputs: ", inputs);
        // ✅ do save
        setTimeout(()=> {
            setLoading(false)
            handleClose();
        }, 2000)
    };
    
  return (
    <Modal open={open} onClose={handleClose} size="xs">
      <Modal.Header>
        <Modal.Title className="py-1 text-center">
          {inputs.id ? "ແກ້ໄຂປະເພດລົດ" : "ເພີ່ມປະເພດລົດ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="h-200px">
        <Form fluid ref={formRef} model={C_Type_model} formValue={inputs}
          onChange={(val) => setInputs(val as CarItem)}
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <InputField name="car_type_name_la" label="ປະເພດລົດ(ລາວ)" accepter={Input} />
            <InputField name="car_type_name_en" label="ປະເພດລົດ(ອັງກິດ)" accepter={Input} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={handleSubmit} appearance="primary" disabled={isLoading}>
            {isLoading ? (
                <Loader size="xs" content='ກຳລັງບັນທຶກ'/>
            ): 'ບັນທຶກ'}
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          ຍົກເລີກ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
