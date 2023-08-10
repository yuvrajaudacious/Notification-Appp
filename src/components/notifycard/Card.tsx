import React, { useState } from "react";
import { Button, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { DeleteTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";

interface CardProps {
  text: string;
  handleClick: (id: any) => void;
  id?: number | string;
  isRead: boolean;
  onDelete: (id: any) => void;
}

export const InsideCard: React.FC<CardProps> = ({
  text,
  handleClick,
  id,
  isRead,
  onDelete,
}) => {
  const readBackgroundColor = "dark";
  const unreadBackgroundColor = "#73e573"; // You can change this color
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [loading, setLoading] = useState<boolean[]>([]);

  const cardStyle = {
    margin: "5px",
    height: "4rem",
    alignItems: "center",
    justifyContent: "space-between",
    display: "fixed",
    overflow: "hidden",
    background: isRead ? readBackgroundColor : unreadBackgroundColor,
  };

  const cardBodyStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "20px",
  };

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      toast.success("Notification has been Deleted");
    }, 2000);
  };

  const buttonMargin = {
    marginLeft: "9px",
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
            width: "58rem",
            display: "flex",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1 }}>
            <span>
              {text ? text.substring(0, 40) + ".........." + "More Read" : ""}
            </span>
          </div>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            data-id={id}
            onClick={() => {
              handleClick(id);
            }}
            style={buttonMargin}
          >
            View
          </Button>
          <Button
            className="danger"
            icon={<DeleteTwoTone />}
            data-id={id}
            onClick={() => {
              onDelete(id);
              enterLoading(1);
            }}
            style={buttonMargin}
            loading={loadings[1]}
            disabled={!isRead} 
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};
