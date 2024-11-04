import { useState } from "react";
import { Modal, Segmented } from "antd";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMessage";

interface ActionModalProps {
  visible: boolean;
  handleOk: (config?: GoToLinkConfig | ShowMessageConfig) => void;
  handleCancel: () => void;
}

export function ActionModal(props: ActionModalProps) {
  const { visible, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>("访问链接");
  const [curConfig, setCurConfig] = useState<
    GoToLinkConfig | ShowMessageConfig
  >();

  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      onOk={() => {
        handleOk(curConfig);
      }}
      onCancel={handleCancel}
      okText="添加"
      cancelText="取消"
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={["访问链接", "消息提示", "自定义JS"]}
        ></Segmented>
        {key === "访问链接" && (
          <GoToLink
            onChange={(config) => {
              setCurConfig(config);
            }}
          ></GoToLink>
        )}
        {key === "消息提示" && (
          <ShowMessage
            onChange={(config) => {
              setCurConfig(config);
            }}
          ></ShowMessage>
        )}
      </div>
    </Modal>
  );
}
