import { Col, Row, Select } from "antd";
import React from "react";

interface Props {}

function HeadModal(props: Props) {
  return (
    <Row
      align={"middle"}
      justify={"space-between"}
      gutter={10}
      style={{
        zIndex: 9999,
        // width: "100%",
        backgroundColor: "white",
        padding: "10px",
        margin: "0 -10px",
        boxShadow: "0 0 5px #333",
      }}
    >
      <Col span={12}>
        <Row
          wrap={true}
          style={{ width: "100%" }}
          justify={"space-between"}
          align={"middle"}
        >
          <Col sm={{ span: 24 }} md={{ span: 5 }}>
            Tỉnh thành phố:
          </Col>
          <Col flex={1}>
            <Select
              popupMatchSelectWidth={false}
              placeholder="Tỉnh thành phố"
              style={{
                display: "flex",
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row
          wrap={true}
          style={{ width: "100%" }}
          justify={"space-between"}
          align={"middle"}
        >
          <Col sm={{ span: 24 }} md={{ span: 5 }}>
            Chi nhánh:
          </Col>
          <Col flex={1}>
            <Select
              popupMatchSelectWidth={false}
              placeholder="Chi nhánh"
              style={{
                display: "flex",
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default HeadModal;
