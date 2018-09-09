import { h, Component } from 'preact';
import style from './style.scss';

export default class Header extends Component {
    goToHomePage = () => {
        const { pathname } = location;

        history.pushState(null, null, pathname);
        // todo fix implementation
        // it's only for demo
        window.dispatchEvent(new CustomEvent('popstate'));
    };

    render() {
        return (
            <header class={style.header}>
                <h1 onClick={this.goToHomePage}>Anon audio</h1>
            </header>
        );
    }
}
