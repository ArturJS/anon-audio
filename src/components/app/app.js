import { h, Component } from 'preact';
import Header from '../header';
import AudioPlayer from '../audio-player';
import UrlInput from '../url-input';
import { queryString } from './utils';
import './style.scss';

export default class App extends Component {
    state = {
        audioSrc: null
    };

    componentDidMount() {
        const { url } = queryString.parse(location.search);

        this.setState({
            audioSrc: url
        });
    }

    saveUrl = () => {
        const { pathname } = location;
        const audioSrc = this.textareaRef.value;

        history.replaceState(
            {},
            '',
            `${pathname}${queryString.stringify({ url: audioSrc })}`
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
                    <UrlInput innerRef={node => (this.textareaRef = node)} />
                    <button
                        type="button"
                        className="btn-save"
                        onClick={this.saveUrl}
                    >
                        Save url
                    </button>
                </div>
            </div>
        );
    }
}
