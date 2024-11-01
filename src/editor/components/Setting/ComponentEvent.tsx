import { Collapse, CollapseProps, Select } from "antd";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";

export function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  const items: CollapseProps["items"] = (
    componentConfig[curComponent.name]?.events || []
  ).map((event) => {
    return {
      key: event.name,
      label: event.name,
      children: (
        <div>
          <div className="flex items-center">
            <div>动作:</div>
            <Select
              className="w-[160px]"
              options={[
                { value: "showMessage", label: "显示提示" },
                { value: "goToLink", label: "跳转链接" },
              ]}
              value={curComponent?.props?.[event.name]?.type}
            ></Select>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="px-[10px]">
      <Collapse className="mb-[10px]" items={items} />
    </div>
  );
}
