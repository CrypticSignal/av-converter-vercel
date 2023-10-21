import React, { Dispatch, SetStateAction } from "react";

interface FlacProps {
  setFlacCompression: Dispatch<SetStateAction<string>>
  flacCompression: string;
}

const Flac: React.FC<FlacProps> = ({ setFlacCompression, flacCompression }) => {
  return (
    <div id="flac">
      <p>Set your desired compression level via the slider:</p>
      <input
        className="slider"
        type="range"
        onChange={(e) => setFlacCompression(e.target.value)}
        min={0}
        max={12}
        step={1}
        defaultValue={5}
        value={flacCompression}
      />
      <span id="flac_value" />
      {` ${flacCompression}`}
      <br />
      <i>A higher value means a slighter smaller file size, but a longer conversion time.</i>
    </div>
  );
};

export default Flac;
