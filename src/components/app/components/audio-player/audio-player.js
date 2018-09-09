import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { createRef } from '../../utils';
import './style.scss';

const debounce = (wrappedMethod, delayMs) => {
    let timerId;

    return (...args) => {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            wrappedMethod(...args);
        }, delayMs);
    };
};

export default class AudioPlayer extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        currentTime: PropTypes.number.isRequired,
        onTimeChanged: PropTypes.func.isRequired
    };

    audioRef = createRef();

    setCurrentTime = () => {
        this.audioRef.current.currentTime = this.props.currentTime;
    };

    handleTimeChanged = debounce(() => {
        const { currentTime } = this.audioRef.current;

        this.props.onTimeChanged(currentTime);
    }, 1000);

    render() {
        const { src } = this.props;

        return (
            <audio
                className="audio-player"
                src={src}
                ref={this.audioRef}
                controls
                loop
                onLoadedMetadata={this.setCurrentTime}
                onSeeked={this.handleTimeChanged}
            />
        );
    }
}
