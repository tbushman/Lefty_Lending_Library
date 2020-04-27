import { envConfig } from '../config';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import { onSnapshot } from "mobx-state-tree";
import App from '../component/app';
// import expect from 'expect';
import * as path from 'path';
// import nock from 'nock';
// import SyncGoogleSheetDialog from '../src/component/content/SyncGoogleSheetDialog';
// import MockSyncGoogleSheetDialog from './fixtures/SyncGoogleSheetDialog';
// import Lll from '../src';
// const nockBack = nock.back;
// nockBack.fixtures = path.join(__dirname, '.', '__nock-fixtures__');
import * as stores from 'stores';

const recording = envConfig.recordEnv;
// nockBack.setMode('record');
describe('SyncGoogleSheetDialog API calls', async () => {
  // let googleSheets
  beforeAll(async() => {
    // googleSheets = await new SyncGoogleSheetDialog();
  });
  test('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider {...stores}>
        
      </Provider>,
      div
    );
    // const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    // const renderedDiv = document.getElementByTagName('div');
    // expect(renderedDiv).not.toBeNull()
  })
})