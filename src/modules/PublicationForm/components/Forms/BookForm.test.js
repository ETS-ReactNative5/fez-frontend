jest.dontMock('./BookForm');

import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import BookForm from './BookForm';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';

function setup({submitting, vocabId, isShallow = true}){

    const props = {
        submitting: submitting || false, // : PropTypes.bool,
        vocabId: vocabId || 0, // : PropTypes.number
    };

    if(isShallow) {
        return shallow(<BookForm {...props} />);
    }

    return mount(<BookForm {...props} />, {
        context: {
            muiTheme: getMuiTheme()
        },
        childContextTypes: {
            muiTheme: PropTypes.object.isRequired
        }
    });

}

beforeAll(() => {
    injectTapEventPlugin();
});

describe('BookForm renders ', () => {
    it('component', () => {
        const wrapper = setup({});
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // TODO: implement tests
    // it('component with X input fields', () => {
    //     const wrapper = setup({});
    //     expect(wrapper.find('Field').length).toEqual(X);
    // });
    //
    // it('component with X required input fields', () => {
    //     const wrapper = setup({});
    //     expect(wrapper.find('Field .requiredField').length).toEqual(0);
    // });

    it('component with all fields disabled', () => {
        const wrapper = setup({submitting: true});
        wrapper.find('Field').forEach(field => {
            expect(field.props().disabled).toEqual(true);
        })
    });
});
