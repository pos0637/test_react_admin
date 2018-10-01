import React from 'react';
import { render } from 'react-dom';
import Application from '~/components/application';
import Framework from '~/framework';

const locales = { 'zh-CN': require('~/app/locales/zh-CN.json') };

render(<Application currentLocale='zh-CN' locales={locales}><Framework /></Application>, document.getElementById('root'));
