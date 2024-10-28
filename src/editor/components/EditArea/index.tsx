import React, { MouseEventHandler, useState } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { Component, useComponentsStore } from "../../stores/components";
import HoverMask from "../HoverMask";
import SelectedMask from "../SelectedMask";

export function EditArea() {
  const { components, curComponentId, setCurComponentId } =
    useComponentsStore();

  const { componentConfig } = useComponentConfigStore();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.component) {
        return null;
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handleMouseOver: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;
      if (componentId) {
        setCurComponentId(+componentId);
        return;
      }
    }
  };

  return (
    <>
      <div
        className="h-[100%] edit-area"
        onMouseOver={handleMouseOver}
        onMouseLeave={() => setHoverComponentId(undefined)}
        onClick={handleClick}
      >
        {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}

        {renderComponents(components)}
        {hoverComponentId && hoverComponentId !== curComponentId && (
          <HoverMask
            componentId={hoverComponentId}
            containerClassName="edit-area"
            portalWrapperClassName="portal-wrapper"
          />
        )}
        {curComponentId && (
          <SelectedMask
            componentId={curComponentId}
            containerClassName="edit-area"
            portalWrapperClassName="portal-wrapper"
          />
        )}
        <div className="portal-wrapper"></div>
      </div>
    </>
  );
}
