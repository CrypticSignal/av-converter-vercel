import { Dispatch, SetStateAction } from "react";

interface QualitySliderProps {
  setQValue: Dispatch<SetStateAction<string>>;
  qValue: string;
}

const QualitySlider: React.FC<QualitySliderProps> = ({ setQValue, qValue }) => {
  return (
    <div id="vorbis_quality_div">
      <p>Set your desired quality setting via the slider:</p>
      <input
        type="range"
        className="slider"
        min={0}
        max={10}
        step={1}
        onChange={(e) => setQValue(e.target.value)}
        value={qValue}
      />
      <span>{qValue}</span>
      <br />
      <i>
        Quality range is from 0 (lowest) to 10 (highest). For more details, click
        <a
          target="_blank"
          rel="noreferrer"
          href="https://wiki.hydrogenaud.io/index.php?title=Recommended_Ogg_Vorbis#Recommended_Encoder_Settings"
        >
          here
        </a>
        and refer to the rows for -q 0 to -q 10.
      </i>
    </div>
  );
};

export default QualitySlider;
