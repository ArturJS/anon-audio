import { h, Component } from 'preact';
import Header from './components/header';
import AudioPlayer from './components/audio-player';
import UrlInput from './components/url-input';
import { queryString } from './utils';
import './style.scss';

export default class App extends Component {
    state = {
        audioSrc: null,
        readonly: false,
        currentTime: 0
    };

    componentDidMount() {
        window.addEventListener('popstate', this.updateAudioParams);
        this.updateAudioParams();
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.updateAudioParams);
    }

    updateAudioParams = () => {
        const { url, readonly, currentTime } = queryString.parse(
            location.search
        );

        this.setState({
            audioSrc: url || null,
            readonly: readonly || false,
            currentTime: +currentTime || 0
        });
    };

    saveUrl = () => {
        const { pathname } = location;
        const audioSrc = this.textareaRef.value;

        if (!audioSrc) {
            return;
        }

        history.replaceState(
            {},
            '',
            `${pathname}${queryString.stringify({
                url: audioSrc,
                readonly: true
            })}`
        );

        this.setState({
            audioSrc
        });
    };

    saveCurrentTime = currentTime => {
        const { audioSrc, readonly } = this.state;
        const { pathname } = location;

        history.replaceState(
            {},
            '',
            `${pathname}${queryString.stringify({
                url: audioSrc,
                readonly,
                currentTime
            })}`
        );
    };

    renderUrlForm() {
        return (
            <div className="url-form">
                <UrlInput innerRef={node => (this.textareaRef = node)} />
                <button
                    type="button"
                    className="btn-save"
                    onClick={this.saveUrl}
                >
                    Save url
                </button>
            </div>
        );
    }

    render() {
        const { audioSrc, readonly, currentTime } = this.state;

        return (
            <div id="app">
                <Header />
                <div className="page-content">
                    <AudioPlayer
                        src={audioSrc}
                        currentTime={currentTime}
                        onTimeChanged={this.saveCurrentTime}
                    />
                    {!readonly && this.renderUrlForm()}
                </div>
            </div>
        );
    }
}
