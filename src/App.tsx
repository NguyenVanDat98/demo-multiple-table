import { Button, Modal, Select } from "antd";
import { useState } from "react";
import "./App.css";
import FormService from "./components/FormService";
import HeadModal from "./components/HeadModal";

function App() {
  const [count, setCount] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setCount((e) => !e)}>
        OpenModel
      </Button>
      <Modal
        open={count}
        closable={false}
        maskClosable
        onClose={() => setCount((e) => !e)}
        onCancel={() => setCount((e) => !e)}
        height={"100%"}
        title={ <HeadModal/>}
        style={{
          top: "40px",
        }}
        width={1400}
        styles={{
          wrapper:{
            height:'100vh',
            overflowY: 'hidden',
          },
          content: {
            overflowY: "auto",
            maxHeight: "90vh",
            padding: "0 10px 0 10px",
            
          },
          header:{
            position: "sticky",
            backgroundColor: "white",
            background:"white",
            top: "0px",
          },
          footer: {
            position: "sticky",
            backgroundColor: "white",
            bottom: "0px",
            paddingBottom:8
          },
        }}
      >
        <FormService />
      </Modal>
    </>
  );
}

export default App;
