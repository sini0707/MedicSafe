
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

function DoctorVideoCallRoom() {
  const { roomId } = useParams();
  const user = useSelector((state) => state.docAuth.doctorInfo);
  const myMeeting = async (element) => {
    const appID = 324857964;
    const serverSecret = "e5327265a29b2a12bafcd64286be7ca3";
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
          url: `https://medicsafe.online/users/room/${roomId}`,
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
      <div className="myCallContainer" ref={myMeeting} style={{ width: "100%", height: "85%" }}/>
    </div>
  );
}

export default DoctorVideoCallRoom;