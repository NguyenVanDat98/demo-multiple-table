import type { ModalProps } from "antd";
import { Button, Modal } from "antd";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FormService from "./components/FormService";
import HeadModal from "./components/HeadModal";
import Layout from "./components/Layout";
import OrderScreen from "./components/order/OrderScreen";
import ScreenService from "./components/services/ScreenService";
import { useAppDispatch } from './hook';
import { rootAction } from "./redux/modal";
import { setupAxios } from "./util/request";

type ModalStyles = ModalProps['styles']
const rootStype: ModalStyles = {
  wrapper: {
    height: "100vh",
    overflowY: "hidden",
  },
  content: {
    overflowY: "auto",
    maxHeight: "90vh",
    padding: "0 10px 0 10px",
  },
  header: {
    position: "sticky",
    backgroundColor: "white",
    background: "white",
    top: "0px",
  },
  footer: {
    position: "sticky",
    backgroundColor: "white",
    bottom: "0px",
    paddingBottom: 8,
  },
}
function App() {
  const [count, setCount] = useState(false);
  const [isOpenWhitebox, setOpenWhitebox] = useState(false);
  const dispatch = useAppDispatch()

  return (
    <>
      <Button type="primary" onClick={() => {
        
        setCount((e) => !e)
        dispatch(rootAction.fetchServiceRequest())
        }}>
        OpenModel
      </Button>

      <Button type="primary" onClick={() => setOpenWhitebox((e) => !e)}>
        OpenModel White box
      </Button>


      <Modal
        destroyOnClose
        open={isOpenWhitebox}
        closable={false}
        maskClosable
        onClose={() => setOpenWhitebox((e) => !e)}
        onCancel={() => setOpenWhitebox((e) => !e)}
        height={"100%"}
        style={{
          top: "40px",
        }}
        width={1400}
        styles={rootStype}
      >
        <ScreenService/>
      </Modal>


      <Modal
        destroyOnClose
        open={count}
        closable={false}
        maskClosable
        onClose={() => setCount((e) => !e)}
        onCancel={() => setCount((e) => !e)}
        height={"100%"}
        title={<HeadModal />}
        style={{
          top: "40px",
        }}
        width={1400}
        styles={rootStype}
      >
        <FormService  chooseed={['669e02927106f93a5a2ce455']} />
      </Modal>
    </>
  );
}

App.Router = function Router(){
  setupAxios()
  return <Routes >
      <Route path="/" element={<Layout/>}>
        <Route path="modal" element={<App/>}/>
        <Route path="order" element={<OrderScreen/>}/>
      </Route>
  </Routes>
}

export default App;
