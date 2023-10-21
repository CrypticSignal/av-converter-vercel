import { Dispatch, SetStateAction } from "react";

interface WavBitDepthSelectorProps {
  setWavBitDepth: Dispatch<SetStateAction<string>>;
  bitDepth: string;
}

const WavBitDepthSelector: React.FC<WavBitDepthSelectorProps> = ({ setWavBitDepth, bitDepth }) => {
  return (
    <div id="wav_bit_depth_div">
      <label htmlFor="wav_bit_depth">Output Bit Depth (audio):</label>
      <select id="wav_bit_depth" onChange={(e) => setWavBitDepth(e.target.value)} value={bitDepth}>
        <option value="16">16</option>
        <option value="24">24</option>
        <option value="32">32</option>
      </select>
    </div>
  );
};

export default WavBitDepthSelector;
