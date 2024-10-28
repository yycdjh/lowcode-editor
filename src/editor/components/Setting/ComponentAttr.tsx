import { Form, Input, Select } from "antd";
import { useComponentsStore } from "../../stores/components";
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/component-config";
import { useEffect } from "react";

export function ComponentAttr() {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();

  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElement(setting: ComponentSetter) {
    const { type, options } = setting;
    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    }
  }

  function valueChange(changeValues: ComponentConfig) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="组件id">
        <Input disabled value={curComponent.id} />
      </Form.Item>

      <Form.Item label="组件名">
        <Input disabled value={curComponent.name} />
      </Form.Item>

      <Form.Item label="组件描述">
        <Input disabled value={curComponent.desc} />
      </Form.Item>
      {componentConfig[curComponent.name]?.setter?.map((item) => (
        <Form.Item key={item.name} label={item.label} name={item.name}>
          {renderFormElement(item)}
        </Form.Item>
      ))}
    </Form>
  );
}
