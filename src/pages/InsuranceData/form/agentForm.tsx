import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Form, Loader, DatePicker, SelectPicker } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../../utils/inputFields'
import { createModel, requiredField } from '../../../utils/validate'

interface AgentItem {
  id?: number | string;
  agent_code: string;
  fullname: string;
  birthday: string;
  card_id: string;
  tel: string;
  district: string
  province: string
  village: string;
  agent_status: string;
  contract: string
}

interface CarModalProps {
  open: boolean;
  setOpen: () => void;
  data?: AgentItem;
  response: (data: AgentItem) => void
}

const C_Type_model = createModel<AgentItem>({
  card_id: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  fullname: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  agent_code: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  birthday: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  tel: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  province: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  district: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  village: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  agent_status: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  contract: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
});

export default function ModalForm({ open, setOpen, data, response }: CarModalProps) {

    const [isLoading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<AgentItem>({
        card_id: "",
        agent_code: '',
        fullname: '',
        birthday: "",
        tel: "",
        province: "",
        district: "",
        village: "",
        agent_status: "",
        contract: "",
      });

      useEffect(() => {
        if(open) {
          if(data && data.id) {
            setInputs(data);
          } else {
            setInputs({
                card_id: "",
                agent_code: '',
                fullname: '',
                birthday: "",
                tel: "",
                province: "",
                district: "",
                village: "",
                agent_status: "",
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
          {inputs.id ? "ແກ້ໄຂອັດຕາແລກປ່ຽນ" : "ເພີ່ມອັດຕາແລກປ່ຽນ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid ref={formRef} model={C_Type_model} formValue={inputs}
          onChange={(val) => setInputs(val as AgentItem)}
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
                    <InputField name="agent_status" label="ສະຖານະ" accepter={SelectPicker} block/>
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