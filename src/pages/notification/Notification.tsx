import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { InsideCard } from "../../components/notifycard/Card";
import { useNavigate } from "react-router-dom";
import {
  getNotification,
  isReadAllNotification,
} from "../../services/services";
import { useQuery } from "@tanstack/react-query";
import { useIsReadNotification } from "../hooks/hooks";
import { BellFilled, PoweroffOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Notification = () => {
  const [enable, setEnable] = useState(false);
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  
  const [notificationData, setNotificationData] = useState([]);
  const { mutateAsync: isReadMutation } = useIsReadNotification();
  const { isFetched, refetch } = useQuery(
    ["getNotification"],
    getNotification,
    {
      onSuccess: (data: any) => setNotificationData(data.data.data.reverse()),
    }
    );
    
    useEffect(() => {
      refetch();
    }, [enable]);
    
    const handleClick = async (e: any) => {
      const id = e.target.getAttribute("data-id");    try {
      const { data } = await isReadMutation(id);
      console.log(data);
      navigate(`/notification/${id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const { data } = useQuery(["readAll"], isReadAllNotification, {
    enabled: enable,
  });

  console.log(data);

  const handleReadAllNotification = () => {
    console.log("all notification treated successfully");
    toast.info("Plz Wait Read a all notification");

    setEnable(true);
    setTimeout(() => {
      setEnable(false);

      refetch();
    }, 1000);

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
      toast.success("all notification treated successfully");
    }, 4000);
  };

  
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0", // Change the background color here
      }}
    >
      <div style={{ width: "80%", marginTop: "2%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Aligns items to opposite sides
            fontWeight: "bolder",
            fontSize: "30px",
            marginLeft: "1%",
            marginBottom: "10px", // Add some spacing
          }}
        >
          <span>Notification          <BellFilled />
          </span>
          <div style={{

            marginRight: "1%",
          }}>

            <Button type="primary"
              loading={loadings[0]} onClick={() => {
                enterLoading(0);
                handleReadAllNotification();

              }} >
              Read All
            </Button>
          </div>
        </div>

        {isFetched &&
          notificationData.map((el: any) => {
            return (
              <div key={el.id}>
                <InsideCard
                  handleClick={handleClick}
                  text={el.message}
                  id={el._id}
                  isRead={el.isRead}
                />
              
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notification;
