import { h } from 'preact';
import './style.scss';

const AudioPlayer = ({ src }) => (
    <audio className="audio-player" src={src} controls loop />
);

export default AudioPlayer;
