import { useState } from "react";
import { useComponentsStore } from "../../stores/components";
import { Segmented } from "antd";
import { ComponentAttr } from "./ComponentAttr";
import { ComponentEvent } from "./ComponentEvent";
import { ComponentStyle } from "./ComponentStyle";

export function Setting() {
  const { curComponentId } = useComponentsStore();

  const [key, setKey] = useState<string>("属性");

  if (!curComponentId) return null;

  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        options={["属性", "事件", "样式"]}
      ></Segmented>
      <div>
        {key === "属性" && <ComponentAttr />}
        {key === "事件" && <ComponentEvent />}
        {key === "样式" && <ComponentStyle />}
      </div>
    </div>
  );
}
