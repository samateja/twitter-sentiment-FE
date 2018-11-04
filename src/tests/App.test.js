import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('it renders without crashing', () => {
  shallow(<App />);
});

it('should call onChange prop with input value', () => {

  const dom = shallow(<App />);
  const onChange = jest.fn(),
  props = {
           value: 'dress',
           onChange
       },
   InputComponent = mount(<App {...props} />).find('input');
   InputComponent.simulate('change', { target: {value: 'dress'} });
   InputComponent.find('button');
   InputComponent.simulate("click");

});
