import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Form, Loader, SelectPicker } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../../../utils/inputFields'
import { createModel, requiredField } from '../../../../utils/validate'

interface OptionItems {
  id?: number | string
  ins_type_fk:string | number;
  option_name_la: string;
  option_name_en: string;
  option_tax: number | string;
}

interface CarModalProps {
  open: boolean;
  setOpen:()=>void;
  data?: OptionItems;
  response: (data: OptionItems) => void
  id: string | number
}

const C_Type_model = createModel<OptionItems>({
ins_type_fk:requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  option_name_la: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  option_name_en: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  option_tax: requiredField("⚠️ ກະລຸນາເລຶອກ...", 'string'),
});

const status=[
    {value: '1', label: '10%'},
    {value: '2', label: 'ຍົກເວັ້ນອາກອນ'}
]

export default function ModalForm({ open, setOpen, data, response, id }: CarModalProps) {

    const [isLoading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<OptionItems>({
        ins_type_fk: id,
        option_name_la: "",
        option_name_en: "",
        option_tax: "",
    });
  
    useEffect(()=> {
      if(open) {
        if (data && data.id) {
          setInputs(data);
        } else {
          setInputs({
            ins_type_fk: '',
            option_name_la: "",
            option_name_en: "",
            option_tax: "",
          })
        }
      }
    }, [open, data]);

    const formRef = useRef<FormInstance>(null);
    const handleSubmit = () => {
        if (!formRef.current?.check()) {
        return; // ❌ validation failed
        }
        setLoading(true);
        console.log("inputs: ", inputs);
        response(inputs)
        setTimeout(()=> {
            setLoading(false)
        }, 2000)
    };
    
  return (
    <Modal open={open} onClose={setOpen} size="xs">
      <Modal.Header>
        <Modal.Title className="py-1">
          {data?.id ? "ແກ້ໄຂທາງເລຶອກ" : "ເພີ່ມທາງເລຶອກ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={formRef} model={C_Type_model} formValue={inputs}
        onSubmit={handleSubmit} onChange={(val) => setInputs(val as OptionItems)} >
          <Form.Group className="mb-3">
            <InputField name="option_name_la" label="ທາງເລຶອກ(ລາວ)" accepter={Input} placeholder="ປ້ອນຊື່(ລາວ)"/>
            <InputField name="option_name_en" label="ທາງເລຶອກ(ອັງກິດ)" accepter={Input} placeholder="ປ້ອນຊື່(ອັງກິດ)" />
            <InputField name="option_tax" label="ອາກອນ" accepter={SelectPicker}
             data={status} block placeholder="ເລຶອກ"/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={handleSubmit} appearance="primary" disabled={isLoading}>
            {isLoading ? (
                <Loader size="xs" content='ກຳລັງບັນທຶກ'/>
            ): 'ບັນທຶກ'}
        </Button>
        <Button onClick={setOpen} color="red" appearance="primary">
          ຍົກເລີກ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
