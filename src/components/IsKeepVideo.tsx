import { Dispatch, SetStateAction } from "react";

interface IsKeepVideoProps {
  setIsKeepVideo: Dispatch<SetStateAction<boolean>>;
  isKeepVideo: boolean;
}

const IsKeepVideo: React.FC<IsKeepVideoProps> = ({ setIsKeepVideo, isKeepVideo }) => {
  return (
    <div id="keep_video_div">
      <br />
      <div className="form-check">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={(e) => setIsKeepVideo(e.target.checked)}
            className="form-check-input"
            value="yes"
            checked={isKeepVideo}
          />
          Keep the video (if applicable)
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={(e) => setIsKeepVideo(!e.target.checked)}
            className="form-check-input"
            value="no"
            checked={!isKeepVideo}
          />
          I want an audio file
        </label>
      </div>
    </div>
  );
};

export default IsKeepVideo;
