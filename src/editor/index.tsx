import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Header } from "./components/Header";
// import { Material } from "./components/Material/index";
import { EditArea } from "./components/EditArea/index";
import { Setting } from "./components/Setting/index";
import { MaterialWrapper } from "./components/MaterialWrapper";
import { useComponentsStore } from "./stores/components";
import { Preview } from "./components/Prview";

export default function ReactPlayground() {
  const { mode } = useComponentsStore();
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[60px] flex items-center border-b-[1px] border-[#000]">
        <Header />
      </div>
      {mode === "edit" ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
            <MaterialWrapper />
            {/* <Material /> */}
          </Allotment.Pane>
          <Allotment.Pane>
            <EditArea />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview></Preview>
      )}
    </div>
  );
}
