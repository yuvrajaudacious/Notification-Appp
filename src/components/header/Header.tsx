import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, Typography } from "antd";
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
  // console.log("object",newCount)

  const handleBellClick = () => {
    navigate("/notification");
  };

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("authToken");
      window.location.reload();
    }, 500);
  };

  return (
    <Header style={{ background: "dark" }}>
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
        <Menu
          style={{
            color: "white",
            fontWeight: "bolder",
            fontSize: "18px",
            cursor: "pointer",
            marginLeft: "50px",
          }}
          theme="dark"
          mode="horizontal"
        >
          {activeUser.admin && (
            <>
              <Menu.Item key="home">
                <Link
                  to="/home"
                  style={{ color: "white", textDecoration: "none" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "lightgray")
                  }
                  onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                >
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="adduser">
                <Link
                  to="/admin"
                  style={{ color: "white", textDecoration: "none" }}
                  className="menu-link"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "lightgray")
                  }
                  onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                >
                  AddUser
                </Link>
              </Menu.Item>
              <Menu.Item key="Send">
                <Link
                  to="/notifications"
                  style={{ color: "white", textDecoration: "none" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "lightgray")
                  }
                  onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                >
                  Send Notification
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
        <div style={{ marginLeft: "auto", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bolder",
              marginRight: "20px",
            }}
          >
            {`${activeUser.name.toUpperCase()} (${activeUser.admin ? "Admin" : "User"
              })` || ""}
          </Text>
          {!activeUser.admin && (
            <BellIcon handleBellClick={handleBellClick} count={count} />
          )}
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;
