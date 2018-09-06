import { h } from 'preact';

const AudioPlayer = ({ src }) => <audio src={src} controls loop />;

export default AudioPlayer;
