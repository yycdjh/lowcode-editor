import { Collapse, CollapseProps, Select } from "antd";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import { GoToLink } from "./actions/GoToLink";

export function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  function selectAction(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, { [eventName]: { type: value } });
  }

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
              onChange={(value) => {
                selectAction(event.name, value);
              }}
              value={curComponent?.props?.[event.name]?.type}
            ></Select>
          </div>
          {curComponent?.props?.[event.name]?.type === "goToLink" && (
            <GoToLink event={event} />
          )}
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
