import Icon from "@mdi/react";
import { mdiBell } from "@mdi/js";

interface BellIconProps {
  count: number;
  handleBellClick: () => void;
}

const BellIcon: React.FC<BellIconProps> = ({ count, handleBellClick }) => {
  console.log("awrghjqwrgj", count);
  return (
    <div
      style={{
      
        position: "absolute",
        cursor: "pointer",
        marginLeft: "-89px",
        marginTop: "-62px",
      }}
      onClick={handleBellClick}
    >
      <>
        {count !== 0 && (
          <div
            style={{
              width: "30px",
              height: "30px",
              border: "2px solid red",
              // padding: "3px",
              padding: "0",
              margin: "0",
              borderRadius: "1rem",
              fontWeight: "bolder",
              color: "white",
              backgroundColor: "red",
              position: "absolute",
              zIndex: "1",
              top: "0",
              right: "0",
            }}
          >
            <div
              style={{
                // border: "2px solid green",
                margin: "0",
                padding: "0",
                height: "25px",
                width: "25px",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                color: "white",
                position: "absolute",
                top: "-20px",
                
              }}
            >
              
              {count}
            </div>
          </div>
        )}
      </>

      <Icon path={mdiBell} size={2} color={"white"} />
    </div>
  );
};

export default BellIcon;
