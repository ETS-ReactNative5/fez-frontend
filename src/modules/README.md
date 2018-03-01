# Modules 

- UI components

## Testing
  
Global test setup is done in /src/test.setup.js:
- getElement - globally available function which creates a shallow or mounted component 

Template for modules unit tests:

```` 

import [COMPONENT_NAME] from './[COMPONENT_NAME]';

function setup(testProps, isShallow = true) {
    // build full props list requied by the component
    const props = {
        ...testProps,
        author: testProps.author || null,
        actions: testProps.actions || {

        },
        history: testProps.history || {
            push: jest.fn()
        }
    };
    return getElement([COMPONENT_NAME], props, isShallow);
}

describe('Component [COMPONENT_NAME]', () => {

    it('should render X if Y', () => {
        // set initial props values
        const props = {
            author: null
        };
        
        const wrapper = setup({...props});
        
        // create snapshot
        expect(toJson(wrapper)).toMatchSnapshot();
        
        // test methods by accessing them via .instance() method
        wrapper.instance().componentWillReceiveProps({
            author: newData
        });
        
        // update state or props
        wrapper.instance().setState({ error: newErrorValue });
        wrapper.instance().setProps({ error: newErrorValue });
        
        // required to wait for re-rendering after changes to props/state
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
        
        // access props/state
        expect(wrapper.state().orcidRequest.state).toBeFalsy();
        expect(field.props().disabled).toEqual(true);
    });

});


````
