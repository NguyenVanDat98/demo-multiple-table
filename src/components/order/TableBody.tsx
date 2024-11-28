import React, { createContext, useContext } from "react";
import HeaderOrder from "./HeaderOrder";
import TableContent from "./TableContent";
import { Form } from "antd";
import TabsOrder from "./TabsOrder";
const stypeDiv: React.CSSProperties = {
  display: "grid",
  gridTemplateRows: "max-content max-content 1fr",
  flexGrow: 1,
  flexWrap: "wrap",
  padding: 10,
  borderRadius: 8,
  border: "0.1px solid #333",
  backgroundColor: "#ffff",
  paddingTop: 0,
  overflowX: "hidden",
  overflowY: "auto",
  position: "relative",
  maxHeight:'100%'
};

const TableProvider = createContext({
  add:(_props?:Product)=>{},
  remove:(_idx:number[]|number)=>{}
})
// eslint-disable-next-line react-refresh/only-export-components
export const useTable = ()=>useContext(TableProvider)

export default function TableBody(): React.JSX.Element {
  return (
      <div style={stypeDiv}>
        <TabsOrder/>
         <Form.List name={"products"} initialValue={[]} >
          {
            (_f,{add,remove})=>{
              return <TableProvider.Provider value={{add,remove}}>
                <HeaderOrder />
                <TableContent />
              </TableProvider.Provider>
            }
          }

         </Form.List>
      </div>
  );
}
