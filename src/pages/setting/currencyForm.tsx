import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Form, Loader } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../utils/inputFields'
import { createModel, requiredField } from '../../utils/validate'

interface CurrencyItem {
  id?: number | string;
  name: string;
  currency_name_la: string;
  currency_name_en: string;
  rate_currency: string;

}

interface CarModalProps {
  open: boolean;
  setOpen: () => void;
  data?: CurrencyItem;
  response: (data: CurrencyItem) => void
}

const C_Type_model = createModel<CurrencyItem>({
  name: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  currency_name_la: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  currency_name_en: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  rate_currency: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
});

export default function ModalForm({ open, setOpen, data, response }: CarModalProps) {

    const [isLoading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<CurrencyItem>({
        id: "",
        name: '',
        currency_name_la: "",
        currency_name_en: "",
        rate_currency: "",
      });

      useEffect(() => {
        if(open) {
          if(data && data.id) {
            setInputs(data);
          } else {
            setInputs({
            name: '',
              currency_name_la: '',
              currency_name_en: '',
              rate_currency: '',
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
    <Modal open={open} onClose={() => setOpen()} size="sm">
      <Modal.Header>
        <Modal.Title className="py-1">
          {inputs.id ? "ແກ້ໄຂອັດຕາແລກປ່ຽນ" : "ເພີ່ມອັດຕາແລກປ່ຽນ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={formRef} model={C_Type_model} formValue={inputs}
          onChange={(val) => setInputs(val as CurrencyItem)}
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <div className="row px-0 mx-0">
                <div className="col-sm-12 mb-3">
                    <InputField name="name" label="ຊື່ທາງການ" accepter={Input} placeholder="ຊື່ສະກຸນເງິນ..."/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="currency_name_en" label="ສະກຸນເງິນ(ອັງກິດ)" accepter={Input}
                    placeholder="ສະກຸນເງິນ..."/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="currency_name_la" label="ສະກຸນເງິນ(ລາວ)" accepter={Input}
                    placeholder="ສະກຸນເງິນ..."/>
                </div>
                <div className="col-sm-12 mb-3">
                    <InputField name="rate_currency" label="ອັດຕາແລກປ່ຽນ" className="text-end" accepter={Input}
                    placeholder="0.00"/>
                </div>
            </div>
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
