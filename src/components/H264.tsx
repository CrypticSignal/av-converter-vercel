import { Dispatch, SetStateAction } from "react";
import NumberInput from "./NumberInput";

interface H264Props {
  setVideoContainer: Dispatch<SetStateAction<string>>;
  videoContainer: string;
  setTranscodeVideo: Dispatch<SetStateAction<boolean>>;
  transcodeVideo: boolean;
  setTranscodeAudio: Dispatch<SetStateAction<boolean>>;
  transcodeAudio: boolean;
  setVideoEncodingType: Dispatch<SetStateAction<string>>;
  videoEncodingType: string;
  setX264Preset: Dispatch<SetStateAction<string>>;
  x264Preset: string;
  setVideoBitrate: Dispatch<SetStateAction<string>>;
  videoBitrate: string;
  setCrfValue: Dispatch<SetStateAction<string>>;
  crfValue: string;
}

const H264: React.FC<H264Props> = ({
  setVideoContainer,
  videoContainer,
  setTranscodeVideo,
  transcodeVideo,
  setTranscodeAudio,
  transcodeAudio,
  setVideoEncodingType,
  videoEncodingType,
  setX264Preset,
  x264Preset,
  setVideoBitrate,
  videoBitrate,
  setCrfValue,
  crfValue,
}) => {
  return (
    <div id="video">
      <label htmlFor="video_container">Output Container: </label>
      <select
        id="video_container"
        onChange={(e) => setVideoContainer(e.target.value)}
        value={videoContainer}
      >
        <option value="mp4">MP4 (.mp4)</option>
        <option value="mkv">MKV (.mkv)</option>
      </select>
      <div id="should_transcode">
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              onChange={(e) => setTranscodeVideo(e.target.checked)}
              className="form-check-input"
              value="yes"
              checked={transcodeVideo}
            />
            Change the video codec to H.264/AVC
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              onChange={(e) => setTranscodeVideo(!e.target.checked)}
              className="form-check-input"
              value="no"
              checked={!transcodeVideo}
            />
            Don't transcode the video but change the format to {videoContainer.toUpperCase()}
          </label>
        </div>
      </div>
      <input
        type="checkbox"
        onChange={(e) => setTranscodeAudio(e.target.checked)}
        checked={transcodeAudio}
      />{" "}
      <label>Transcode the audio to AAC</label>
      <br />
      <i style={{ display: transcodeAudio ? "block" : "none" }}>
        The audio bitrate will be set to 256 kbps.
      </i>
      <div id="video_encoding_type" style={{ display: transcodeVideo ? "block" : "none" }}>
        <br />
        <label htmlFor="video_encoding_type">Encoding Type:</label>
        <select onChange={(e) => setVideoEncodingType(e.target.value)} value={videoEncodingType}>
          <option value="crf">CRF (constant quality)</option>
          {/* <option value="filesize">Target a filesize</option> */}
          <option value="bitrate">Target a bitrate (Mbps)</option>
        </select>
      </div>
      <div id="x264_preset_div" style={{ display: transcodeVideo ? "block" : "none" }}>
        <label htmlFor="x264_preset">x264 preset:</label>
        <select onChange={(e) => setX264Preset(e.target.value)} value={x264Preset}>
          <option value="veryslow">veryslow</option>
          <option value="slower">slower</option>
          <option value="slow">slow</option>
          <option value="medium">medium</option>
          <option value="fast">fast</option>
          <option value="superfast">superfast</option>
          <option value="ultrafast">ultrafast</option>
        </select>
      </div>
      <div
        id="target_bitrate_div"
        style={{ display: videoEncodingType === "bitrate" ? "block" : "none" }}
      >
        <NumberInput
          onVideoBitrateChange={(e) => setVideoBitrate(e.target.value)}
          videoBitrate={videoBitrate}
          units="Mbps"
        />
      </div>
      {/* <div
        id="target_filesize_div"
        style={{ display: videoEncodingType === "filesize" ? "block" : "none" }}
      >
        <NumberInput
          onChange={onVideoFilesizeChange}
          value={videoFilesize}
          units="MB"
        />
      </div> */}
      <div
        id="crf_div"
        style={{ display: transcodeVideo && videoEncodingType === "crf" ? "block" : "none" }}
      >
        <strong>Constant Rate Factor (CRF)</strong>
        <br />
        <input
          type="range"
          className="slider"
          onChange={(e) => setCrfValue(e.target.value)}
          min={0}
          max={51}
          step={1}
          value={crfValue}
        />
        <span id="crf_value" />
        {` ${crfValue}`}
        <br />
        <i>
          A lower CRF means higher video quality, at the expense of a larger file size. A CRF of 17
          or 18 is considered to be visually lossless or nearly so. More details{" "}
          <a href="https://trac.ffmpeg.org/wiki/Encode/H.264#crf" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </i>
      </div>
    </div>
  );
};

export default H264;
