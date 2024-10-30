import { Segmented } from "antd";
import { useState } from "react";
import { Material } from "../Material";
import { Outline } from "../Outline";
import { Source } from "../Source";

export function MaterialWrapper() {
  const [key, setKey] = useState<string>("物料");
  return (
    <div>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={["物料", "大纲", "源码"]}
      ></Segmented>
      <div className="pt-[20px]">{key === "物料" && <Material />}</div>
      <div className="pt-[20px]">{key === "大纲" && <Outline />}</div>
      <div className="pt-[20px]">{key === "源码" && <Source />}</div>
    </div>
  );
}
