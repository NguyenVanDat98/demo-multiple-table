import React from "react";
import HeaderOrder from "./HeaderOrder";
import TableContent from "./TableContent";
const stypeDiv: React.CSSProperties = {
  display: "grid",
  gridTemplateRows: "max-content 1fr",
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
export default function TableBody(): React.JSX.Element {
  return (
      <div style={stypeDiv}>
        <HeaderOrder />
        <TableContent />
      </div>
  );
}
