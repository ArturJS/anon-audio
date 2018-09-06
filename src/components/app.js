import { h, Component } from 'preact';
import Header from './header';
import AudioPlayer from './audio-player';

export default class App extends Component {
    state = {
        audioSrc: null
    };

    componentDidMount() {
        const audioSrc = decodeURIComponent(
            location.search.replace('?url=', '')
        );

        this.setState({
            audioSrc
        });
    }

    saveUrl = () => {
        const { pathname } = location;
        const audioSrc = this.textareaRef.value;

        history.replaceState(
            {},
            '',
            `${pathname}?url=${encodeURIComponent(audioSrc)}`
        );

        this.setState({
            audioSrc
        });
    };

    render() {
        const { audioSrc } = this.state;

        return (
            <div id="app">
                <Header />
                <div className="page-content">
                    <AudioPlayer src={audioSrc} />
                    <textarea ref={node => (this.textareaRef = node)} />
                    <button type="button" onClick={this.saveUrl}>
                        Save url
                    </button>
                </div>
            </div>
        );
    }
}
