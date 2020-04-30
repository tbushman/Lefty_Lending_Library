import envConfig from '../config/env.config';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, withRouter } from 'react-router';
import { Provider } from "mobx-react";
import { onSnapshot } from "mobx-state-tree";
import { shallow } from 'enzyme';
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

// const recording = envConfig.recordEnv;
// const testing = envConfig.testEnv;
// if (!recording) {
// 
// } else {
//   nockBack.setMode('record');
// }
// nockBack.setMode('record');
describe('SyncGoogleSheetDialog API calls', () => {
  let googleSheets, key, app, agent;
  const AppWithRouter = withRouter(App);
  beforeAll(async() => {
    document.body.innerHTML = `
      <div id="root"></div>
    `    // googleSheets = await new SyncGoogleSheetDialog();

    // app = await ReactDOM.render(
    //   <Provider {...stores}>
    //     <Router history={history}>
    //       <AppWithRouter/>
    //     </Router>
    //   </Provider>,
    //   document.getElementById('root') as HTMLElement
    // );
    // const renderedDiv = document.getElementById('root');
    // expect(renderedDiv).not.toBeNull()
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
    const app = await shallow(
        <Provider {...stores}>
          <Router history={history}>
            <AppWithRouter/>
          </Router>
        </Provider>
    )
    expect(app).toMatchSnapshot();
  })
  // key = 'should get a header';
  // test(key, async () => {
  //   // const snapKey = ('API calls '+key+' 1');
  //   const { nockDone } = await nockBack(
  //     'app.header.json'
  //   );
  //   // const { getAuthCode } = authMiddleware;
  //   nock.enableNetConnect('127.0.0.1');
  //   await agent
  //   .get('/')
  //   .expect(302)
  //   .expect('Location', '/home')
  //   .then((res)=>{
  //     header = res.header;
  //     expect(header).to.matchSnapshot();
  //   })
  //   nockDone()
  // })
})