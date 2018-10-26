import React from 'react';
import { render } from 'react-dom';
import Application from '~/components/application';
import List from './list';

render(<Application><List /></Application>, document.getElementById('root'));
