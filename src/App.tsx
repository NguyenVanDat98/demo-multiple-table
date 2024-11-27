import { Button, Modal, Select } from "antd";
import type { ModalProps } from "antd";
import { useState } from "react";
import "./App.css";
import FormService from "./components/FormService";
import HeadModal from "./components/HeadModal";
import Whitebox from "./components/Whitebox";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import OrderScreen from "./components/order/OrderScreen";

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

  return (
    <>
      <Button type="primary" onClick={() => setCount((e) => !e)}>
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
        <Whitebox.M2 style={{
          
        }}>render</Whitebox.M2>
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
        <FormService />
      </Modal>
    </>
  );
}
App.Router = function(){
  return <Routes >
      <Route path="/" element={<Layout/>}>
        <Route path="modal" element={<App/>}/>
        <Route path="order" element={<OrderScreen/>}/>
      </Route>
  </Routes>
}

export default App;
