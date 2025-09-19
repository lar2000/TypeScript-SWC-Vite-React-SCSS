import { useRef, useState, useEffect } from "react";
import { Modal, Input, Button, Form, Loader, SelectPicker } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../../../utils/inputFields'
import { createModel, requiredField } from '../../../../utils/validate'

interface BrandItems {
  id?: number | string
  car_type_fk:string | number;
  brand_name: string;
}

interface CarModalProps {
  open: boolean;
  setOpen:() => void;
  data?: BrandItems;
  response: (data: BrandItems) => void
}

const B_model = createModel<BrandItems>({
  car_type_fk:requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  brand_name: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
});

export default function ModalForm({ open, setOpen, data, response }: CarModalProps) {

      const [inputs, setInputs] = useState<BrandItems>({
        car_type_fk: '',
        brand_name: "",
      });

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      if (open) {
        if (data && data.id) {
          setInputs(data);
        } else {
          setInputs({ car_type_fk: '', brand_name: '' });
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

    const carTypes = [
        {value: 'k', label: 'ລົດເກັງ - keng'},
        {value: 'g', label: 'ກະບະ - gaba'},
        {value: 'v', label: 'ວີໂກ້ - vigo'},
        {value: 'd', label: 'ດ້າມ - dam'},
        {value: 'm', label: 'ແມັກໂຄ - macco'},
    ]
    
  return (
    <Modal open={open} onClose={() =>setOpen()} size="xs">
      <Modal.Header>
        <Modal.Title className="py-1">
          {data?.id ? "ແກ້ໄຂຍີ່ຫໍ້ລົດ" : "ເພີ່ມຍີ່ຫໍ້ລົດ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={formRef} model={B_model} formValue={inputs}
        onSubmit={handleSubmit} onChange={(val) => setInputs(val as BrandItems)} >
          <Form.Group className="mb-3">
            <InputField name="car_type_fk" label="ປະເພດລົດ" data={carTypes}
            accepter={SelectPicker} block placeholder="ເລຶອກ..."/>
            <InputField name="brand_name" label="ຍີ່ຫໍ້ລົດ" accepter={Input} placeholder="ປ້ອນ..."/>
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