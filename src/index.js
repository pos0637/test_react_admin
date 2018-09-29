import React from 'react';
import { render } from 'react-dom';
import Application from '~/components/application';
import MainFrame from '~/framework/mainFrame';

const locales = { 'zh-CN': require('~/app/locales/zh-CN.json') };

render(<Application currentLocale='zh-CN' locales={locales}><MainFrame /></Application>, document.getElementById('root'));
