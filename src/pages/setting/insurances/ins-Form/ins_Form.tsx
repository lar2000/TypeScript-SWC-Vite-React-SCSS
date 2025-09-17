import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Form, Loader, SelectPicker } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../../../utils/inputFields'
import { createModel, requiredField } from '../../../../utils/validate'

interface InsTypeItems {
  id?: number | string;
  ins_type_name_la: string;
  ins_type_name_en: string;
  ins_status: string;
}

interface CarModalProps {
  open: boolean;
  setOpen: () => void;
  data?: InsTypeItems;
  response: (data: InsTypeItems) => void
}

const INS_Type_model = createModel<InsTypeItems>({
  ins_type_name_la: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  ins_type_name_en: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  ins_status: requiredField("⚠️ ກະລຸນາເລຶອກ...", 'string')
});

export default function ModalForm({ open, setOpen, data, response }: CarModalProps) {

    const [isLoading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<InsTypeItems>({
        id: "",
        ins_type_name_la: "",
        ins_type_name_en: "",
        ins_status: "",
    });

    useEffect(() => {
      if (open) {
        if (data && data.id) {
          setInputs(data);
        } else {
          setInputs({
            ins_type_name_la: "",
            ins_type_name_en: "",
            ins_status: "",
          })
        }
      }
    },[open, data])

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
            response(inputs)
        }, 2000)
    };
    
  return (
    <Modal open={open} onClose={() => setOpen()} size="xs">
      <Modal.Header>
        <Modal.Title className="py-1 text-center">
          {inputs.id ? "ແກ້ໄຂປະເພດປະກັນ" : "ເພີ່ມປະເພດປະກັນ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={formRef} model={INS_Type_model} formValue={inputs}
          onChange={(val) => setInputs(val as InsTypeItems)}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <InputField name="ins_type_name_la" label="ປະເພດປະກັນ(ລາວ)" accepter={Input} placeholder="ປ້ອນ..."/>
            <InputField name="ins_type_name_en" label="ປະເພດປະກັນ(ອັງກິດ)" accepter={Input} placeholder="ປ້ອນ..."/>
            <InputField name="ins_status" label="ສະຖານະ" accepter={SelectPicker} block placeholder="ເລຶອກສະຖານະ"/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={handleSubmit} appearance="primary" disabled={isLoading}>
            {isLoading ? (
                <Loader size="xs" content='ກຳລັງບັນທຶກ'/>
            ): 'ບັນທຶກ'}
        </Button>
        <Button onClick={() => setOpen()} color="red" appearance="primary">
          ຍົກເລີກ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
