import envConfig from '../config/env.config';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, withRouter } from 'react-router';
import { Provider } from "mobx-react";
import { onSnapshot } from "mobx-state-tree";
import App from '../component/app';
import * as path from 'path';
// import nock from 'nock';
import SyncGoogleSheetDialog from '../src/component/content/SyncGoogleSheetDialog';
// import MockSyncGoogleSheetDialog from './fixtures/SyncGoogleSheetDialog';
// const nockBack = nock.back;
// nockBack.fixtures = path.join(__dirname, '.', '__nock-fixtures__');
import * as stores from 'stores';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();
const routerStore = stores.routerStore;

const history = syncHistoryWithStore(browserHistory, routerStore);

const recording = envConfig.recordEnv;
// nockBack.setMode('record');
describe('SyncGoogleSheetDialog API calls', () => {
  let googleSheets;
  const AppWithRouter = withRouter(App);
  beforeAll(async() => {
    document.body.innerHTML = `
      <div id="root"></div>
    `    // googleSheets = await new SyncGoogleSheetDialog();

    ReactDOM.render(
      <Provider {...stores}>
        <Router history={history}>
          <AppWithRouter/>
        </Router>
      </Provider>,
      document.getElementById('root') as HTMLElement
    );

    const renderedDiv = document.getElementById('root');
    expect(renderedDiv).not.toBeNull()
  });
  // test('should render', () => {
  //   document.body.innerHTML = `
  //     <div id="test"></div>
  //   `
  //   ReactDOM.render(
  //     <Provider {...stores}>
  // 
  //     </Provider>,
  //     document.getElementById('test') as HTMLElement
  //   );
  //   const renderedDiv = document.getElementById('test');
  //   expect(renderedDiv).not.toBeNull()
  // })
  test('should load app', async() => {
  })
})