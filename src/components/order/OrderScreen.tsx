import React from "react";
import Summary from "./Summary";
import TableBody from "./TableBody";
import { OrderProvider } from "./Order.context";
const stypeDiv: React.CSSProperties = {
  height: "100%",
  backgroundColor: "rgb(226 226 226)",
  display: "flex",
  gap: 10,
  padding: 10,
  paddingTop: 0,
};
export default function OrderScreen(): React.JSX.Element {
  return (
    <OrderProvider>
      <div style={stypeDiv}>
        <TableBody />
        <Summary />
      </div>
    </OrderProvider>
  );
}
