import React, { useState, ChangeEvent } from "react";
import { Layout, Card, Input, Button } from "antd";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, MailOutlined } from "@ant-design/icons";

const { Footer: AntdFooter } = Layout;

function Footer() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    if (email) {
      // Implement email sending logic here
      console.log("Sending email:", email);
      // sendEmail(email);
      setEmail("");
    }
  };

  return (
    <AntdFooter style={{ textAlign: "center", background: "#000", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <a href="https://www.facebook.com">
            <FacebookOutlined style={{ fontSize: "24px", color: "#fff", marginRight: "10px" }} />
          </a>
          <a href="https://www.instagram.com">
            <InstagramOutlined style={{ fontSize: "24px", color: "#fff", marginRight: "10px" }} />
          </a>
          <a href="https://www.twitter.com">
            <TwitterOutlined style={{ fontSize: "24px", color: "#fff", marginRight: "10px" }} />
          </a>
        </div>
        <Card style={{ width: 350, height:150, backgroundColor: "white", border: "none" }}>
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              style={{ marginRight: "10px" }}
            />
          </div>
          <div style={{
            marginTop:"30px"
          }}>

          </div>
            <Button type="primary" onClick={handleSendEmail}>
              <MailOutlined /> Send Email
            </Button>
        </Card>
      </div>
      <div>
        copywrite since 2020 @DEMO
      </div>
    </AntdFooter>
  );
}

export default Footer;
