
import  { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ValidUrl } from "@/helper/helper";
import NotFounds from "@/app/ui/NotFounds";

export default function VideoPlayerTab({ video_link }) {
  const [isUiLoaded, setisUiLoaded] = useState(false);
  useEffect(() => {
    setisUiLoaded(true);
  }, []);

  if (!isUiLoaded) {
    return null;
  }
  return (
    <>
      {video_link && ValidUrl(video_link) ? (
        <ReactPlayer
          className="ch-tab-details-video-wrapper"
          width="100%"
          height="500px"
          url={video_link}
          controls={true}
        />
      ) : (
        <NotFounds message={ValidUrl(video_link) && "Your Url is not Valid"} />
      )}
    </>
  );
}
