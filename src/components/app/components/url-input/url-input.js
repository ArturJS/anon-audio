import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { createRef } from '../../utils';
import './style.scss';

export default class UrlInput extends Component {
    static propTypes = {
        innerRef: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.autofitContent();
        this.props.innerRef(this.textareaRef.current);
    }

    componentDidUpdate() {
        this.autofitContent();
    }

    textareaRef = createRef();

    autofitContent = () => {
        window.requestAnimationFrame(() => {
            const { current: textareaEl } = this.textareaRef;

            if (!textareaEl) {
                return;
            }

            textareaEl.style.height = '0px';
            textareaEl.style.height = `${textareaEl.scrollHeight}px`;
        });
    };

    removeLinebreaks = () => {
        const { current: textareaEl } = this.textareaRef;

        textareaEl.value = textareaEl.value.replace(/[\r\n]+/g, '');
    };

    handleOnInput = () => {
        this.removeLinebreaks();
        this.autofitContent();
    };

    render() {
        return (
            <textarea
                ref={this.textareaRef}
                className="url-input"
                placeholder="Enter audio url here..."
                onInput={this.handleOnInput}
            />
        );
    }
}
