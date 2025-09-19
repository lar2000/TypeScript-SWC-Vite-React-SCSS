import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Form, Loader } from "rsuite";
import type { FormInstance } from "rsuite";
import { InputField } from '../../../utils/inputFields'
import { createModel, requiredField } from '../../../utils/validate'

interface CompanyItem {
  id?: number | string
  logo_path: string;
  com_name_la: string;
  com_name_en: string;
  tel: string;
  email: string;
  address_la: string;
  address_en: string;
}

interface CompProp {
  open: boolean;
  setOpen: () => void;
  data?: CompanyItem;
  response: (data: CompanyItem) => void
  id: string | number
}

const C_model = createModel<CompanyItem>({
  logo_path:requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  com_name_la: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  com_name_en: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  tel: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  email: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'email'),
  address_la: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
  address_en: requiredField("⚠️ ກະລຸນາປ້ອນ...", 'string'),
});

export default function ModalForm({ open, setOpen, data, response }: CompProp) {

      const [inputs, setInputs] = useState<CompanyItem>({
        logo_path: '',
        com_name_la: "",
        com_name_en: "",
        tel: "",
        email: "",
        address_la: "",
        address_en: "",
      });

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      if(open) {
        if (data && data.id) {
          setInputs(data);
        } else {
          setInputs({
            logo_path: '',
            com_name_la: "",
            com_name_en: "",
            tel: "",
            email: "",
            address_la: "",
            address_en: "",
          })
        }
      }
    },[open, data])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setInputs(prev => ({ ...prev, logo_path: reader.result as string }));
        };
        reader.readAsDataURL(file); // convert to base64 for preview
    };
  
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
    <Modal open={open} onClose={() => setOpen()} size="md">
      <Modal.Header>
        <Modal.Title className="py-1">
          {data?.id ? "ແກ້ໄຂບໍລິສັດປະກັນໄພ" : "ເພີ່ມບໍລິສັດປະກັນໄພ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-2">
        <Form fluid ref={formRef} model={C_model} formValue={inputs}
        onSubmit={handleSubmit} onChange={(val) => setInputs(val as CompanyItem)} >
            <div className="d-flex flex-column justify-content-center align-items-center">
                <label htmlFor="fileInput"
                className="d-flex justify-content-center align-items-center cursor-pointer w-150px mb-2"
                >
                    {inputs.logo_path || data?.logo_path ? (
                        <img src={inputs.logo_path || data?.logo_path} alt="logo preview" className="dropzone cover rounded-4 mb-1" 
                        style={{ width: '150px', height: '130px'}}/>
                    ) : (
                        <i className="far fa-image text-cyan-300 fa-10x"></i>
                    )}
                    </label>
                    <input id="fileInput" type="file" accept="image/*" className="d-none"
                    onChange={handleFileChange}
                    />
            </div>
            <div className="row px-0 mx-0">
                <Form.Group className="col-sm-6 mb-3">
                    <InputField name="com_name_la" label="ຊື່ບໍລິສັດ(ລາວ)" accepter={Input} placeholder="ປ້ອນຊື່..."/>
                    <InputField name="tel" label="ເບີໂທລະສັບ" accepter={Input} placeholder="020/030" 
                    icon={<i className="fa fa-phone"></i>} iconPosition="start"/>
                    <InputField name="address_la" label="ທີຢູ່(ລາວ)" accepter={Input} placeholder="..." />
                </Form.Group>
                <Form.Group className="col-sm-6 mb-3">
                    <InputField name="com_name_en" label="ຊື່ບໍລິສັດ(ອັງກິດ)" accepter={Input} placeholder="ປ້ອນຊື່..." />
                    <InputField name="email" label="ອີເມວ໌" accepter={Input} placeholder="example.123@gmail.com" 
                    icon={<i className="fa fa-envelope"></i>} iconPosition="start"/>
                    <InputField name="address_en" label="ທີຢູ່(ອັງກິດ)" accepter={Input} placeholder="ປ້ອນຊື່..." />
                </Form.Group>
          </div>
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