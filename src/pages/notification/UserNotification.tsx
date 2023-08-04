import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { getNotification } from "../../services/services";
import { UserOutlined } from "@ant-design/icons";

const UserNotification = () => {
  const param: any = useParams();
  const [text, setText] = useState("");
  const { data, isFetched } = useQuery(["getNotification"], getNotification, {
    onSuccess: (data: any) => {
      const notify = data.data.data.filter((el: any) => el._id === param.id);
      setText(notify[0].message);
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start", // Align to the left
        margin: "20px",
      }}
    >
      <Card
        style={{
          backgroundColor: "#dcf8c6", // Light green color for the main card
          padding: "10px 15px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
          maxWidth: "200%", // Limit the width of the main card
        }}
      >
        <div style={{
          backgroundColor: "#D7DBDD", // Light green color for the main card
          padding: "10px 15px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
          maxWidth: "100%", // Limit the width of the main card
        }}>
          <UserOutlined /> Admin
        </div>
        <div
          style={{
            fontSize: "14px",
            marginBottom: "4px",
          }}
        >
        </div>

        <Card
          style={{
            backgroundColor: "#ffffff", // White color for the nested card
            marginTop: "10px", // Add some spacing
            padding: "8px",
            borderRadius: "6px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Shadow
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#000000",
              width: "230px",
            }}
          >
            {isFetched && text}
          </div>
        </Card>
        <div
          style={{
            fontSize: "12px",
            color: "#727272",
            textAlign: "right",
          }}
        >
Seen        </div>
      </Card>
    </div>
  );
};

export default UserNotification;
