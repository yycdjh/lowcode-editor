import React, { useEffect } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { Component, useComponentsStore } from "../stores/components";

export function EditArea() {
  const { components, addComponent, deleteComponent, updateComponentProps } =
    useComponentsStore();

  const { componentConfig } = useComponentConfigStore();
  useEffect(() => {
    addComponent(
      {
        id: 222,
        name: "Container",
        props: {},
        children: [],
      },
      1
    );

    addComponent(
      {
        id: 333,
        name: "Button",
        props: {},
        children: [],
      },
      222
    );

    // updateComponentProps(222, {
    //   title: "6666",
    // });

    // setTimeout(() => {
    //   deleteComponent(333);
    // }, 3000);
  }, []);

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
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <div className="h-[100%]">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}

      {renderComponents(components)}
    </div>
  );
}
