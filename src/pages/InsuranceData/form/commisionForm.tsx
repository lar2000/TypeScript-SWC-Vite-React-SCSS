import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Form, Loader, DatePicker, SelectPicker } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../../utils/inputFields'
import { createModel, requiredField } from '../../../utils/validate'

interface CustomerItem {
  id?: number | string;
  type: string;
  fullname: string;
  birthday: string;
  card_id: string;
  tel: string;
  district: string
  province: string
  village: string;
  cust_status: string;
  contract: string
}

interface CustomerProps {
  open: boolean;
  setOpen: () => void;
  data?: CustomerItem;
  response: (data: CustomerItem) => void
}

const C_Type_model = createModel<CustomerItem>({
  card_id: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  fullname: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  type: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  birthday: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  tel: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  province: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  district: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  village: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  cust_status: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  contract: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
});

export default function ModalForm({ open, setOpen, data, response }: CustomerProps) {

    const [isLoading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<CustomerItem>({
        card_id: "",
        type: '',
        fullname: '',
        birthday: "",
        tel: "",
        province: "",
        district: "",
        village: "",
        cust_status: "",
        contract: "",
      });

      useEffect(() => {
        if(open) {
          if(data && data.id) {
            setInputs(data);
          } else {
            setInputs({
                card_id: "",
                type: '',
                fullname: '',
                birthday: "",
                tel: "",
                province: "",
                district: "",
                village: "",
                cust_status: "",
                contract: "",
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
    <Modal open={open} onClose={() => setOpen()} size="md">
      <Modal.Header>
        <Modal.Title className="py-1 text-center">
          {inputs.id ? "ແກ້ໄຂຂໍ້ມູນລູກຄ້າ" : "ເພີ່ມຂໍ້ມູນລູກຄ້າ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={formRef} model={C_Type_model} formValue={inputs}
          onChange={(val) => setInputs(val as CustomerItem)}
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <div className="row px-0 mx-0">
                <div className="col-sm-6 mb-3">
                    <InputField name="card_id" label="ລະຫັດບັດ" accepter={Input}
                    icon={<i className="fa fa-address-card"></i>} iconPosition="start"/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="fullname" label="ຊື່ ແລະ ນາມສະກຸນ" accepter={Input}
                    icon={<i className="fa fa-user"></i>} iconPosition="start"/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="tel" label="ເບີໂທລະສັບ" accepter={Input}
                    icon={<i className="fa fa-phone"></i>} iconPosition="start"/>
                </div>
                 <div className="col-sm-6 mb-3">
                    <InputField name="birthday" label="ວດປ ເກີດ" accepter={DatePicker} oneTap block/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="province" label="ແຂວງ" accepter={SelectPicker} block/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="district" label="ເມືອງ" accepter={SelectPicker} block/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="village" label="ບ້ານ" accepter={Input}/>
                </div>
                <div className="col-sm-6 mb-3">
                    <InputField name="cust_status" label="ສະຖານະ" accepter={SelectPicker} block/>
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