import React from 'react';
import { mount } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  let props;
  let mountedLockScreen;
  const homeScreen = () => {
    if (!mountedLockScreen) {
      mountedLockScreen = mount(
        <Home {...props} />,
      );
    }
    return mountedLockScreen;
  };

  beforeEach(() => {
    props = {
    };
    mountedLockScreen = undefined;
  });

  it('always renders a div', () => {
    const divs = homeScreen().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});
