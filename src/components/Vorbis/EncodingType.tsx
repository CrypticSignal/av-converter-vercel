import { Dispatch, SetStateAction } from "react";
import BitrateSlider from "../BitrateSlider";
import QualitySlider from "./QualitySlider";

interface VorbisEncodingTypeProps {
  setVorbisEncodingType: Dispatch<SetStateAction<string>>;
  vorbisEncodingType: string;
  setQValue: Dispatch<SetStateAction<string>>;
  qValue: string;
}

const VorbisEncodingType: React.FC<VorbisEncodingTypeProps> = ({
  setVorbisEncodingType,
  vorbisEncodingType,
  setQValue,
  qValue,
}) => {
  function renderComponent() {
    switch (vorbisEncodingType) {
      case "abr":
        return <BitrateSlider initialValue="192" min="32" max="512" step="32" />;
      case "vbr":
        return <QualitySlider setQValue={setQValue} qValue={qValue} />;
      default:
        return null;
    }
  }
  return (
    <div id="Vorbis">
      <div id="vorbis_encoding_div">
        <label>VBR setting:</label>
        <select onChange={(e) => setVorbisEncodingType(e.target.value)} value={vorbisEncodingType}>
          <option disabled>Select encoding type</option>
          <option value="abr">ABR (Average Bitrate)</option>
          <option value="vbr">VBR (target a quality level)</option>
        </select>
        <br />
      </div>
      {renderComponent()}
    </div>
  );
};

export default VorbisEncodingType;
