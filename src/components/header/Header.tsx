import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, Typography, Dropdown, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BellIcon from "../bellIcon/BellIcon";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../services/services";
import { Howl } from "howler";

const { Header } = Layout;
const { Text } = Typography;

const notificationSound = new Howl({
  src: ["/notification.mp3"],
});

interface User {
  name: string;
  admin: boolean;
}

export const getUserDetails = (): User => {
  const token: string = localStorage.getItem("authToken") || "";
  const decoded: any = jwt_decode(token);
  return decoded.user;
};

function AppHeader(): JSX.Element {
  const navigate = useNavigate();
  const activeUser: User = getUserDetails();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const { data } = useQuery(["getNotification"], getNotification);

  useEffect(() => {
    if (data) {
      const newCount = data.data.count;
      if (newCount > count) {
        notificationSound.play();
      }
      setCount(newCount);
    }
  }, [data]);

  const handleBellClick = () => {
    navigate("/notification");
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("authToken");
      window.location.reload();
    }, 500);
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout">
        <Button onClick={handleLogout}>Logout</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: "dark", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Text
          onClick={() => navigate("/")}
          style={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          DEMO
        </Text>
        <div
          style={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "18px",
            cursor: "pointer",
            marginLeft: "50px",
          }}
        >
          {activeUser.admin && (
            <>
              <Link
                to="/home"
                style={{ color: "white", textDecoration: "none", marginRight: "20px" }}
              >
                Home
              </Link>
              <Link
                to="/admin"
                style={{ color: "white", textDecoration: "none", marginRight: "20px" }}
              >
                AddUser
              </Link>
              <Link
                to="/notifications"
                style={{ color: "white", textDecoration: "none" }}
              >
                Send Notification
              </Link>
            </>
          )}
        </div>
        <div style={{ marginLeft: "auto", alignItems: "center", textDecoration: "none" }}>
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Text
              style={{
                color: "white",
                fontWeight: "bolder",
                marginRight: "20px",
                cursor: "pointer",
              }}
            >
              {`${activeUser.name.toUpperCase()} (${activeUser.admin ? "Admin" : "User"
                })` || ""}
            </Text>
          </Dropdown>
          {!activeUser.admin && (
            <BellIcon handleBellClick={handleBellClick} count={count} />
          )}
        </div>
      </div>
      <Modal
        title="Logout"
        visible={showLogoutConfirmation}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        okText="Logout"
        cancelText="Cancel"
      >
        Are you sure you want to logout?
      </Modal>
    </Header>

    
  );
}

export default AppHeader;
