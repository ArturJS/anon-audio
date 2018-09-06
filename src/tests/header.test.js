import { h } from 'preact';
import Header from '../components/header';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';

describe('<Header/>', () => {
    test('Header renders correct title', () => {
        const context = shallow(<Header />);

        expect(context.find('h1').text()).toBe('Anon audio');
    });
});
