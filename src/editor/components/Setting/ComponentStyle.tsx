import { Form, Input, InputNumber, Select } from "antd";
import { useComponentsStore } from "../../stores/components";
import {
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/component-config";
import { CSSProperties, useEffect } from "react";

export function ComponentStyle() {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } =
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
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      onValuesChange={valueChange}
    >
      {componentConfig?.[curComponent?.name]?.stylesSetter?.map((setting) => {
        return (
          <Form.Item
            key={setting.name}
            label={setting.label}
            name={setting.name}
          >
            {renderFormElement(setting)}
          </Form.Item>
        );
      })}
    </Form>
  );
}
