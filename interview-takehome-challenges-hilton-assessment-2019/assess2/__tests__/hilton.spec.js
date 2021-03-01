import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { cookieId } from '../data/constants';
import defaultData from '../data/defaultData';
import Card from '../components/Card';
import Form from '../components/Form';
import 'jest-styled-components';


let tested;

beforeAll(() => {
  document.cookie = '';
});

beforeEach(() => {
  tested = mount(<Form roomsData={defaultData} cookieId={cookieId} />);
});

afterEach(() => {
  tested.unmount();
});

/* 1. By default, the 'Adult' and 'Children' drop-down fields for rooms 2, 3, and 4
      should be disabled.  Upon checking the checkbox of room 2, the drop-down fields
      associated with room 2 should be enabled. */

describe('default form control state', () => {
  const cases = [
    ['#adults-dropdown-2', [1, 2]],
    ['#adults-dropdown-3', [1, 2]],
    ['#adults-dropdown-4', [1, 2]],
    ['#children-dropdown-2', [0, 1, 2]],
    ['#children-dropdown-3', [0, 1, 2]],
    ['#children-dropdown-4', [0, 1, 2]],
  ];

  test.each(cases)(
    'whether %p is disabled by default and has field values of %p',
    (dropdown, values) => {
      expect(tested.find(dropdown).props().choices).toEqual(values);
      expect(tested.find(dropdown).props().disabled).toBe(true);
  },
);
});

describe('form control behavior', () => {
  const cases = [
    ['#s-checkbox-2', '#adults-dropdown-2'],
    ['#s-checkbox-3', '#adults-dropdown-3'],
    ['#s-checkbox-4', '#adults-dropdown-4'],
    ['#s-checkbox-2', '#children-dropdown-2'],
    ['#s-checkbox-3', '#children-dropdown-3'],
    ['#s-checkbox-4', '#children-dropdown-4'],
  ];

  test.each(cases)(
    'whether checking %p enables %p',
    (checkbox, dropdown) => {
      tested.find(checkbox).at(1).simulate('change');
      expect(tested.find(dropdown).props().disabled).toBe(false);
    },
  );
});

/* 2. If the user checks the 'Room 3' checkbox, Room 2 should auto-check. (See
      Figure B in screenshot). If the user checks the 'Room 4' checkbox, Room 2 and
      Room 3 should auto-check. */

describe('relationship between checkboxes', () => {
  test('whether 2nd checkbox autochecks in response to checking of 3rd checkbox', () => {
    expect(tested.find('#s-checkbox-2').at(1).props().checked).toEqual(false);
    tested.find('#s-checkbox-3').at(1).simulate('change');
    expect(tested.find('#s-checkbox-2').at(1).props().checked).toEqual(true);
  });
  test('whether 2nd checkbox autochecks in response to checking of 4rd checkbox', () => {
    expect(tested.find('#s-checkbox-2').at(1).props().checked).toEqual(false);
    tested.find('#s-checkbox-3').at(1).simulate('change');
    expect(tested.find('#s-checkbox-2').at(1).props().checked).toEqual(true);
  });
  test('whether 3nd checkbox autochecks in response to checking of 4rd checkbox', () => {
    expect(tested.find('#s-checkbox-3').at(1).props().checked).toEqual(false);
    tested.find('#s-checkbox-3').at(1).simulate('change');
    expect(tested.find('#s-checkbox-3').at(1).props().checked).toEqual(true);
  });
});

//  3. Any room that is checked should have a selected state, whose presentation is
//  identical to the 'Room 1' field, and it's corresponding Adults/Children
//  drop-down fields should be enabled.

//  JEH: This criterian is partly covered by the first test above, which checked whether
//  the dropdowns of each card were enabled when the corresponding checkbox was checked.
//  The tests that follow, taken with the first test, complete the coverage.

describe('relationship between checkboxes', () => {
  const dispatch = () => jest.fn();

  const roomChecked = {
    id: 2,
    isChecked: true, // enables
    adults: 1,
    children: 0,
  };

  const roomUnchecked = {
    id: 2,
    isChecked: false, // enables
    adults: 1,
    children: 0,
  };

  test('whether Card 2 has the correct styles when enabled', () => {
    const tree = renderer.create(<Card key={2} room={roomChecked} dispatch={dispatch} />).toJSON();
    expect(tree).toHaveStyleRule('background-color', '#E6E6E6');
    expect(tree).toHaveStyleRule('border', '0.25rem solid #E6E6E6');

    const gotten = render(<Card key={2} room={roomChecked} dispatch={dispatch} />);
    expect(gotten.getByTestId('s-card-header')).toHaveStyleRule('background-color', '#E6E6E6');
    expect(gotten.getByTestId('s-card-body')).toHaveStyleRule('background-color', '#FFFFFF');
  });

  test('whether Card 2 has the correct styles when disabled', () => {
    const tree = renderer.create(<Card key={2} room={roomUnchecked} dispatch={dispatch} />).toJSON();
    expect(tree).toHaveStyleRule('background-color', '#DADAE2');
    expect(tree).toHaveStyleRule('border', '0.25rem solid #CBCFD9');

    const gotten = render(<Card key={2} room={roomUnchecked} dispatch={dispatch} />);
    expect(gotten.getByTestId('s-card-header')).toHaveStyleRule('background-color', 'transparent');
    expect(gotten.getByTestId('s-card-body')).toHaveStyleRule('background-color', 'transparent');
  });
});

/* Snapshots */

describe.skip('the relationship between selected state and appearance', () => {
  it('renders enabled state correctly', () => {
    const disabled = false;
    const key = 1;
    const dispatch = () => jest.fn();
    const room = {
      id: 2,
      isChecked: false,
      adults: 1,
      children: 0,
    };
    const tree = renderer
      .create(<Card disabled={disabled} key={key} room={room} dispatch={dispatch} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders disabled state correctly', () => {
    const disabled = true;
    const key = 1;
    const dispatch = () => jest.fn();
    const room = {
      id: 2,
      isChecked: false,
      adults: 1,
      children: 0,
    };
    const tree = renderer
      .create(<Card disabled={disabled} key={key} room={room} dispatch={dispatch} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
