import { Dispatch, SetStateAction } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import AlertDiv from "./AlertDiv";
import ConvertButton from "./ConvertButton";

interface AC3Props {
  setAc3Bitrate: Dispatch<SetStateAction<string>>;
  ac3Bitrate: string;
}

const AC3: React.FC<AC3Props> = ({ setAc3Bitrate, ac3Bitrate }) => {
  return (
    <div id="AC3">
      <p>
        The maximum number of output channels is 6. Therefore, audio with more than 6 channels (such
        as 7.1 surround) will get downmixed to 5.1
      </p>
      <label htmlFor="ac3_bitrate">Bitrate:</label>
      <select id="ac3_bitrate" onChange={(e) => setAc3Bitrate(e.target.value)} value={ac3Bitrate}>
        <option disabled>Select a Bitrate</option>
        <option value="192">192kbps</option>
        <option value="384">384kbps</option>
        <option value="448">448kbps</option>
        <option value="640">640kbps</option>
      </select>
      <br />
      <i>
        A higher bitrate allows for potentially higher audio quality, at the expense of a larger
        file size.
      </i>
    </div>
  );
};

export default AC3;
