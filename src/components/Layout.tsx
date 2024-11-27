import { Button } from "antd";
import React, { PropsWithChildren } from "react";
import { NavLink, Outlet } from "react-router-dom";
type propsType = {};
export default function Layout(
  props: PropsWithChildren<propsType>
): React.JSX.Element {
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        width: "100vw",
        display: "grid",
        placeItems:'center',
        gridTemplateRows: "max-content 1fr",
      }}
    >
      <Button.Group
        style={{
          display: "flex",
          position:'sticky',
          top: 0,
          zIndex: 10,
          width: "100vw",
          justifyContent: "center",
          gap: 10,
          padding: "10px 0",
          backgroundColor: "#FFFFFF",
        }}
      >
        <NavLink to={"/modal"} end>
          {(props) => (
            <Button type={props.isActive ? "primary" : "default"}>Modal</Button>
          )}
        </NavLink>
        <NavLink to={"/order"} end>
          {(props) => (
            <Button type={props.isActive ? "primary" : "default"}>Bill</Button>
          )}
        </NavLink>
      </Button.Group>
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight:'100%',
          overflowX: "hidden",
          position:'relative',
          overflowY: "auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
