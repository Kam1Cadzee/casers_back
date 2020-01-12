import React, {useState} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {useDispatch} from 'react-redux';
import {addTransportFetch, getTransportsFetch} from '../redux-data/transport';
import service from '../service';
import {Status} from '../status';

const options = [
  { label: 'В дорозi', value: Status.WAY },
  { label: 'Прибутті', value: Status.ARRIVED },
];

const AddTransportForm = (props: any) => {
  const dispatch = useDispatch();
  const { getFieldDecorator, resetFields } = props.form;
  const [status, setStatus] = useState([Status.WAY, Status.ARRIVED]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        values.status = "way";
        values.devices = values.devices
          .split(",")
          .map((item: any) => ({ number: item, damaged: false }));
        await dispatch(addTransportFetch(values));
        dispatch(getTransportsFetch(status));
        resetFields();
      }
    });
  };
  const onChange = (checkedValues: any) => {
    setStatus(checkedValues);
    dispatch(getTransportsFetch(checkedValues));
  };

  const handelClear = async () => {
    await service.deleteTransports();
    dispatch(getTransportsFetch(status));
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item>
      <Checkbox.Group options={options} defaultValue={status} onChange={onChange} />
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("number_transport", {
          rules: [{ required: true, message: "Це поле обов'язкове" }],
        })(
          <Input placeholder="Номер машини" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("number_trailer",{
          rules: [{ required: true, message: "Це поле обов'язкове" }],
        })(
          <Input placeholder="Номер прицепа" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("driver",{
          rules: [{ required: true, message: "Це поле обов'язкове" }],
        })(<Input placeholder="Водiй" />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("devices", {
          initialValue: "123,234,345",
          rules: [{ required: true, message: "Це поле обов'язкове" }],

        })(<Input placeholder="ЗПУ" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавити
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handelClear}>
          Очистити все
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({
  name: "addForm"
})(AddTransportForm);
