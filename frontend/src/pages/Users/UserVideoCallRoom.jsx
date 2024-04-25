import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function UserVideoCallRoom() {
  const { roomId } = useParams();

  const user = useSelector((state) => state.auth.userInfo);
  const myMeeting = async (element) => {
    const appID = 112231611;
    const serverSecret = "a1806e931f243b655c5b1ba966aba829";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      user.name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:5173/doctors/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100%", height: "85%" }}
      />
    </div>
  );
}

export default UserVideoCallRoom;
