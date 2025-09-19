import { useEffect, useRef, useState } from "react";
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
  setOpen: () => void;
  data?: CarItem;
  response: (data: CarItem) => void
}

const C_Type_model = createModel<CarItem>({
  car_type_name_la: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  car_type_name_en: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
});

export default function ModalForm({ open, setOpen, data, response }: CarModalProps) {

    const [isLoading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<CarItem>({
        id: "",
        car_type_name_la: "",
        car_type_name_en: "",
      });

      useEffect(() => {
        if(open) {
          if(data && data.id) {
            setInputs(data);
          } else {
            setInputs({
              car_type_name_la: '',
              car_type_name_en: '',
            })
          }
        }
      },[open, data])

    const formRef = useRef<FormInstance>(null);
    const handleSubmit = () => {
        if (!formRef.current?.check()) {
        return;
        }
        setLoading(true);
        console.log("inputs: ", inputs);
        response(inputs)
        setTimeout(()=> {
            setLoading(false)
        }, 2000)
    };
    
  return (
    <Modal open={open} onClose={() => setOpen()} size="xs">
      <Modal.Header>
        <Modal.Title className="py-1">
          {inputs.id ? "ແກ້ໄຂປະເພດລົດ" : "ເພີ່ມປະເພດລົດ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="h-200px">
        <Form fluid ref={formRef} model={C_Type_model} formValue={inputs}
          onChange={(val) => setInputs(val as CarItem)}
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <InputField name="car_type_name_la" label="ປະເພດລົດ(ລາວ)" accepter={Input} 
            placeholder="ປ້ອນ..."/>
            <InputField name="car_type_name_en" label="ປະເພດລົດ(ອັງກິດ)" accepter={Input} 
            placeholder="ປ້ອນ..."/>
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
