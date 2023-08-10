import React from "react";
import { Layout, Menu } from "antd";
import "./home.css";

const { Sider, Content } = Layout;

function Home() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="dark" width={100} style={{ overflow: "auto" }}>
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div className="heros">
            <video playsInline autoPlay muted loop poster="polina.jpg" id="bgvid">
              <source src={require("../../video/backg.mp4")} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
