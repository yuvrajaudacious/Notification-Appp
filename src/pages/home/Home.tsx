import React from "react";
import { Layout, Menu, Carousel } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={80}>
        <div
          style={{
            height: "32px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px",
          }}
        />
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PieChartOutlined />} />
          <Menu.Item key="2" icon={<DesktopOutlined />} />
          <Menu.Item key="3" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout>
      <h1>Welcome to Your App</h1>
          <p>This is your home page built with Ant Design and TypeScript.</p>
        <Content style={{ margin: "16px" }}>
          <div>

          <Carousel autoplay>
            <div>
              <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"></img>{" "}
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"></img>{" "}
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"></img>{" "}
            </div>
            {/* Add more slides as needed */}
          </Carousel>
          </div>
          {/* Rest of your content */}
        
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
