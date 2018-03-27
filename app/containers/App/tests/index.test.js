import React from 'react';
import { mountWithIntl } from 'tests/intl-enzyme-test-helper';
import { Route } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import App from '../index';

describe('<App />', () => {
  it('should render the header', () => {
    const renderedComponent = mountWithIntl(<App />);
    expect(renderedComponent.find(Header).length).toBe(1);
  });

  it('should render some routes', () => {
    const renderedComponent = mountWithIntl(<App />);
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });

  it('should render the footer', () => {
    const renderedComponent = mountWithIntl(<App />);
    expect(renderedComponent.find(Footer).length).toBe(1);
  });
});
