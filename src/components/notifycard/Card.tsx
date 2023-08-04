import React from "react";
import { Button, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { DeleteTwoTone } from "@ant-design/icons";

interface CardProps {
  text: string;
  handleClick: React.MouseEventHandler<HTMLElement>;
  id?: number | string;
  isRead: boolean;
}

export const InsideCard: React.FC<CardProps> = ({
  text,
  handleClick,
  id,
  isRead,
}) => {
  // Define background colors for read and unread cards
  const readBackgroundColor = "dark";
  const unreadBackgroundColor = "#73e573"; // You can change this color

  const cardStyle = {
    margin: "5px",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    background: isRead ? readBackgroundColor : unreadBackgroundColor,
  };

  const cardBodyStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "20px",
  };

  const buttonMargin = {
    marginLeft: "8px", // Adjust the margin value as needed
  };

  return (
    <div>
      <Card
        className="custom-card"
        style={cardStyle}
        bordered={false}
        bodyStyle={cardBodyStyle}
      >
        <div
          style={{
            marginRight: "20px",
            width: "78rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ flex: 1 }}>
            <span>{text ? text.substring(0, 40) + ".........." +"More Read": ""}</span>
          </div>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            data-id={id}
            onClick={handleClick}
            style={buttonMargin} // Apply margin to the button
          >
          </Button>
          <Button
            className="danger"
            icon={<DeleteTwoTone />}
            onClick={handleClick}
            style={buttonMargin} // Apply margin to the button
          >
          </Button>
        </div>
      </Card>
    </div>
  );
};
