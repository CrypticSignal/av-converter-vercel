'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectSliderValue } from '../redux/bitrateSliderSlice';
// Converter
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { convertFile } from '../utils/convertFile';
import { createFFmpegArgs } from '../utils/createFFmpegArgs';
// General Components
import AlertDiv from '../components/AlertDiv';
import BitrateSlider from '../components/BitrateSlider';
import ConvertButton from '../components/ConvertButton';
import FileInput from '../components/FileInput';
import FormatSelector from '../components/FormatSelector';
import IsKeepVideo from '../components/IsKeepVideo';
import Navbar from '../components/Navbar';
// Images
import ffmpegLogo from '../images/ffmpeg-25.png';
import webAssemblyLogo from '../images/webassembly-25.png';
// Output Format Related Components
import AC3 from '../components/AC3';
import DTS from '../components/Dts';
import FLAC from '../components/Flac';
import H264 from '../components/H264';
import MP3EncodingTypeSelector from '../components/MP3/EncodingTypeSelector';
import NoSettingsApplicable from '../components/NoSettingsApplicable';
import Opus from '../components/Opus';
import VorbisEncodingType from '../components/Vorbis/EncodingType';
import WavBitDepthSelector from '../components/WavBitDepthSelector';
// React-Bootstrap
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
// Utils
import showAlert from '../utils/showAlert';

const Home = () => {
  const ffmpegRef = useRef(new FFmpeg());
  const ffmpeg = ffmpegRef.current;

  const [file, setFile] = useState<File>();
  const [inputFilename, setInputFilename] = useState('');
  const [codec, setCodec] = useState('MP3');
  // Conversion progress.
  const [progress, setProgress] = useState(0);
  // AC3
  const [ac3Bitrate, setAc3Bitrate] = useState('640');
  // FLAC
  const [flacCompression, setFlacCompression] = useState('5');
  // Keep the video?
  const [isKeepVideo, setIsKeepVideo] = useState(false);
  // H.264/AVC
  const [crfValue, setCrfValue] = useState('18');
  const [transcodeAudio, setTranscodeAudio] = useState(true);
  const [transcodeVideo, setTranscodeVideo] = useState(true);
  const [videoBitrate, setVideoBitrate] = useState('8');
  const [videoContainer, setVideoContainer] = useState('mp4');
  const [videoEncodingType, setVideoEncodingType] = useState('crf');
  const [x264Preset, setX264Preset] = useState('superfast');
  // MP3
  const [mp3EncodingType, setMp3EncodingType] = useState('cbr');
  const [mp3VbrSetting, setMp3VbrSetting] = useState('0');
  // Opus
  const [opusEncodingType, setOpusEncodingType] = useState('vbr');
  // Vorbis
  const [vorbisEncodingType, setVorbisEncodingType] = useState('abr');
  const [qValue, setQValue] = useState('6');
  // WAV
  const [wavBitDepth, setWavBitDepth] = useState('16');

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files![0]);
    const filename = e.currentTarget.files![0].name;
    setInputFilename(filename);
    const inputLabel = document.getElementById('file_input_label')!;
    const outputNameBox = document.getElementById(
      'output_name'
    ) as HTMLInputElement;
    inputLabel.innerText = filename;
    outputNameBox.value = filename.split('.').slice(0, -1).join('.');
  };

  const onCodecChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCodec(e.currentTarget.value);
  };

  const bitrateSliderValue = useSelector(selectSliderValue);

  const onConvertClicked = async () => {
    if (!file) {
      showAlert('You must choose an input file.', 'danger');
      return;
    }

    console.clear();

    // @ts-ignore
    const { ffmpegArgs, outputFilename } = createFFmpegArgs(
      ac3Bitrate,
      bitrateSliderValue,
      codec,
      crfValue,
      flacCompression,
      isKeepVideo,
      inputFilename,
      mp3EncodingType,
      mp3VbrSetting,
      opusEncodingType,
      (document.getElementById('output_name') as HTMLInputElement).value,
      qValue,
      transcodeVideo,
      transcodeAudio,
      videoBitrate,
      videoContainer,
      videoEncodingType,
      vorbisEncodingType,
      wavBitDepth,
      x264Preset
    );

    if (outputFilename === inputFilename) {
      showAlert(
        'Output filename cannot be same as the input filename.',
        'danger'
      );
      return;
    }

    ffmpegArgs.unshift(inputFilename);
    ffmpegArgs.unshift('-i');
    ffmpegArgs.push(outputFilename);

    document.getElementById('convert_btn')!.style.display = 'none';
    convertFile(
      ffmpeg,
      file,
      ffmpegArgs,
      inputFilename,
      outputFilename,
      setProgress
    );
  };

  const showEncoderSettings = () => {
    switch (codec) {
      case 'AAC':
        return (
          <BitrateSlider initialValue='192' min='32' max='256' step='32' />
        );
      case 'AC3':
        return (
          <div>
            <AC3 setAc3Bitrate={setAc3Bitrate} ac3Bitrate={ac3Bitrate} />
            <IsKeepVideo
              setIsKeepVideo={setIsKeepVideo}
              isKeepVideo={isKeepVideo}
            />
          </div>
        );
      case 'ALAC':
        return (
          <div>
            <NoSettingsApplicable />
            <IsKeepVideo
              setIsKeepVideo={setIsKeepVideo}
              isKeepVideo={isKeepVideo}
            />
          </div>
        );
      case 'CAF':
        return <NoSettingsApplicable />;
      case 'DTS':
        return (
          <div>
            <DTS />
            <IsKeepVideo
              setIsKeepVideo={setIsKeepVideo}
              isKeepVideo={isKeepVideo}
            />
          </div>
        );
      case 'FLAC':
        return (
          <div>
            <FLAC
              setFlacCompression={setFlacCompression}
              flacCompression={flacCompression}
            />
            <IsKeepVideo
              setIsKeepVideo={setIsKeepVideo}
              isKeepVideo={isKeepVideo}
            />
          </div>
        );
      case 'MKA':
        return (
          <i>
            Only the audio streams will be kept and left as-is (no transcoding
            will be done). The Matroska container will be used.
          </i>
        );

      case 'MP3':
        return (
          <div>
            <MP3EncodingTypeSelector
              setMp3EncodingType={setMp3EncodingType}
              encodingType={mp3EncodingType}
              setMp3VbrSetting={setMp3VbrSetting}
              vbrSetting={mp3VbrSetting}
            />
            <IsKeepVideo
              setIsKeepVideo={setIsKeepVideo}
              isKeepVideo={isKeepVideo}
            />
          </div>
        );
      case 'H264':
        return (
          <H264
            setVideoContainer={setVideoContainer}
            setTranscodeVideo={setTranscodeVideo}
            setCrfValue={setCrfValue}
            crfValue={crfValue}
            transcodeAudio={transcodeAudio}
            setTranscodeAudio={setTranscodeAudio}
            transcodeVideo={transcodeVideo}
            videoContainer={videoContainer}
            videoBitrate={videoBitrate}
            setVideoBitrate={setVideoBitrate}
            videoEncodingType={videoEncodingType}
            setVideoEncodingType={setVideoEncodingType}
            x264Preset={x264Preset}
            setX264Preset={setX264Preset}
          />
        );
      case 'Opus':
        return (
          <Opus
            setOpusEncodingType={setOpusEncodingType}
            encodingType={opusEncodingType}
          />
        );
      case 'Vorbis':
        return (
          <VorbisEncodingType
            setVorbisEncodingType={setVorbisEncodingType}
            vorbisEncodingType={vorbisEncodingType}
            setQValue={setQValue}
            qValue={qValue}
          />
        );
      case 'WAV':
        return (
          <WavBitDepthSelector
            setWavBitDepth={setWavBitDepth}
            bitDepth={wavBitDepth}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <h1>Audio / Video Converter</h1>
      <div id='powered_by'>
        <i id='ffmpeg'>Powered by FFmpeg</i>
        <a href='https://ffmpeg.org/' target='_blank' rel='noreferrer'>
          <Image id='ffmpeg_logo' src={ffmpegLogo} alt='ffmpeg logo' />
        </a>
        <i id='webassembly'>and WebAssembly</i>
        <a href='https://webassembly.org/' target='_blank' rel='noreferrer'>
          <Image src={webAssemblyLogo} alt='web assembly logo' />
        </a>
      </div>
      <Container>
        <FileInput onFileInput={onFileInput} />
        <i style={{ fontSize: '80%' }}>Max Filesize: 2 GB</i>
        <hr />

        <FormatSelector onCodecChange={onCodecChange} codec={codec} />
        <hr />

        <h5>Encoder Settings</h5>
        {showEncoderSettings()}
        <br />
        <hr />

        <h5>Output Filename</h5>
        <input
          type='text'
          autoComplete='off'
          className='form-control'
          maxLength={200}
          id='output_name'
          required
        />

        <div id='converting_spinner' style={{ display: 'none' }}>
          <Spinner id='converting_btn' animation='border' /> Converting...
        </div>

        <div id='conversion_progress' style={{ display: 'none' }}>
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>

        <AlertDiv />

        <div id='convert_btn'>
          <br />
          <ConvertButton onConvertClicked={onConvertClicked} />
        </div>
      </Container>
    </>
  );
};

export default Home;
