import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addTransportFetch, getTransportsFetch } from "../redux-data/transport";
import service from "../service";

/*
id: 12
collisionId: "11"
status: "collision"
createdDate: "2020-01-09T12:54:53.089Z"
number_transport: "AA0AA"
number_trailer: "AA1AA"
driver: "driver"
devices: Array(2)
0: {number: "123123", damaged: false}
1: {number: "44123", damaged: false}
length: 2
 */
const AddTransportForm = (props: any) => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        values.status = "way";
        values.devices = values.devices
          .split(",")
          .map((item: any) => ({ number: item, damaged: false }));
        console.log("Received values of form: ", values);
        dispatch(addTransportFetch(values));
      }
    });
  };

  const handelClear = async () => {
    await service.deleteTransports();
    dispatch(getTransportsFetch());
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("number_transport")(
          <Input placeholder="number_transport" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("number_trailer")(
          <Input placeholder="number_trailer" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("driver")(<Input placeholder="driver" />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("devices", {
          initialValue: "123,234,345"
        })(<Input placeholder="devices" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
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
