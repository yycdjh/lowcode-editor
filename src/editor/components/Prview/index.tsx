import React from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { Component, useComponentsStore } from "../../stores/components";
import { message } from "antd";
import { GoToLinkConfig } from "../Setting/actions/GoToLink";
import { ShowMessageConfig } from "../Setting/actions/ShowMessage";

export function Preview() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  function handleEvent(component: Component) {
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        props[event.name] = () => {
          eventConfig?.actions?.forEach(
            (actions: GoToLinkConfig | ShowMessageConfig) => {
              if (actions.type === "goToLink") {
                window.location.href = actions.url;
              } else if (actions.type === "showMessage") {
                if (actions.config.type === "success") {
                  message.success(actions.config.text);
                } else if (actions.config.type === "error") {
                  message.error(actions.config.text);
                }
              }
            }
          );
        };
      }
    });

    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.prod) {
        return null;
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component),
        },
        renderComponents(component.children || [])
      );
    });
  }

  return <div>{renderComponents(components)}</div>;
}
