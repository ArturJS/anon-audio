import { h, Component } from 'preact';
import Header from '../header';
import AudioPlayer from '../audio-player';
import UrlInput from '../url-input';
import { queryString } from './utils';
import './style.scss';

export default class App extends Component {
    state = {
        audioSrc: null,
        readonly: false
    };

    componentDidMount() {
        const { url, readonly } = queryString.parse(location.search);

        this.setState({
            audioSrc: url,
            readonly
        });
    }

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
        const { audioSrc, readonly } = this.state;

        return (
            <div id="app">
                <Header />
                <div className="page-content">
                    <AudioPlayer src={audioSrc} />
                    {!readonly && this.renderUrlForm()}
                </div>
            </div>
        );
    }
}
