import dotenv from 'dotenv';
import envConfig from '../../config/env.config';
import { 
  Book, 
  // BookLenderInfo 
} from "data/models";
import * as React from 'react';
// import { google } from 'googleapis';
// import { GoogleAuth } from 'google-auth-library';
import GooglePicker from 'react-google-picker';
// import { Button, DialogActions } from '@material-ui/core';
// import { BookCondition } from 'data/enums';
// import * as path from 'path';
import { inject, observer } from 'mobx-react';
import { 
  // bookStore, 
  // userStore 
} from 'stores';
dotenv.config();

interface ISyncGoogleSheetsDialogProps {
    open: boolean,
    onClose: any,
    // classes: any
}

interface ISyncGoogleSheetsDialogState {
    pendingBook: Book | null;
    pendingISBN: string | null;
    bookExistsInBackend: boolean;
}

// interface NewRow {
//   author?: string | null,
//   title?: string | null,
//   editor?: string | null,
//   edition?: string | null,
//   keywords?: string | null,
//   physical?: string | null,
//   pdf?: string | null,
//   url?: string | null,
//   copies?: string | null,
//   lender?: string | null,
//   borrower?: string | null,
//   checkout?: string | null,
//   return?: string | null,
//   underlining?: string | null,
//   notes?: string | null,
//   isbn?: string | null,
// }

const initialState = {
    pendingBook: null,
    pendingISBN: "",
    bookExistsInBackend: false
};

@inject('bookStore', 'authStore', 'userStore')
@observer
class SyncGoogleSheetDialog extends React.Component<ISyncGoogleSheetsDialogProps, ISyncGoogleSheetsDialogState> {
  state = initialState;
  scopes = [
    // 'https://www.googleapis.com/auth/plus.login',
    // 'https://www.googleapis.com/auth/userinfo.email', 
    // 'https://www.googleapis.com/auth/userinfo.profile', 
    'email',
    'profile',
    'https://www.googleapis.com/auth/drive.appdata', 
    'https://www.googleapis.com/auth/drive.file'
  ];
  // keyUrl = '../../../admin/LLL-serviceAccountKey.secret.json'//path.join(__dirname, '../../', 'admin/LLL-serviceAccountKey.secret.json');
  // keyfile = require(this.keyUrl);
  // key = require(this.keyfile);
  // clientId = this.key.client_id;
  developerKey = envConfig.googleKey;
  
  // private handleSearchISBN = async(isbn: string) => {
  // 
  //     if(isbn.length != 13){
  //         alert('Only 13 digit ISBNs are supported (FOR THE MOMENT!)'); //TODO: Make the error display better
  //         return;
  //     }
  //     let searchResult = await bookStore.findBookOnlineByISBN(isbn);
  //     if(!searchResult.Book){
  //         // alert('I couldnt find that book 😱, sry...'); //TODO: Make the error display better
  //         return;
  //     }
  //     this.setState({
  //         pendingBook: searchResult.Book,
  //         bookExistsInBackend: searchResult.BookExistsInBackend,
  //         pendingISBN: ""
  //     });
  // }
  
  // private handleAddBook = async(newRow: NewRow) => {
  //     //Get lenerBooksInfo from the Google sheet
  //     // const newRowKeys = Object.keys(newRow);
  //     // const physicalCopyKey = newRowKeys.filter(key=>/physical\scopy/gi.test(key))[0];
  //     // const isPhysicalCopy = /yes/gi.test(newRow[physicalCopyKey])
  //     if (!newRow.physical) {
  //       return
  //     }
  //     // const isbnKey = newRowKeys.filter(key=>/isbn/gi.test(key))[0];
  //     const isbn = newRow.isbn
  //     // if (isbn.length != 13) {
  //     //   return;
  //     // }
  //     await this.handleSearchISBN(isbn);
  //     // const permissionToMarkupKey = newRowKeys.filter(key=>/underlining\spermitted/gi.test(key))[0];
  //     // const lenderKey = newRowKeys.filter(key=>/lender/gi.test(key))[0];
  //     let fakeLenderBookInfo = new BookLenderInfo();
  //     fakeLenderBookInfo.Condtion = BookCondition.Like_New;
  //     fakeLenderBookInfo.LenderName = newRow.lender;
  //     fakeLenderBookInfo.PermissionToMarkup = /yes/gi.test(newRow.underlining);
  //     fakeLenderBookInfo.Quantity = 3;
  // 
  //     if(this.state.pendingBook){
  //         await bookStore.createBookAndAssociateWithLender(fakeLenderBookInfo, this.state.pendingBook!, userStore.userProfile!.uid);
  //         await this.setState({
  //             pendingBook: null,
  //             bookExistsInBackend: false,
  //             pendingISBN: ""
  //         });
  //     }
  // 
  //     // this.handleClose();
  // }
  
  private pickerCallback = async(data: any) => {
    // let doc;
    alert(data)
    // if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED && data[google.picker.Response.DOCUMENTS][0]) {
    //   doc = data[google.picker.Response.DOCUMENTS][0]
    // }
    // if (!doc) return;
    // const auth = new GoogleAuth({
    //   scopes: this.scopes
    // });
    // const authClient = await auth.getClient();//new google.auth.JWT(this.key.client_email, null, this.key.private_key, this.scopes);
    // // authClient.authorize((err, response) => {
    //   const sheets = google.sheets({version: 'v4', auth: authClient});
    //   sheets.spreadsheets.values.get({
    //     spreadsheetId: doc.id,
    //     range: 'Books',
    //   }, async (err, result) => {
    //     if (err) alert(err);//return console.log('The API returned an error: ' + err);
    //     let hr: string[] = [];
    //     await result.data.values
    //     .map(async (row, i) => {
    //       // Author(s) (or Editor(s) If There Is No Author)	
    //       // Book Title	
    //       // Editor(s) and/or Translator(s) (If Author Given)	
    //       // Edition	
    //       // Keywords	
    //       // Physical Copy?	
    //       // PDF Copy?	
    //       // Free Online URL	
    //       // # of copies	
    //       // Lender	
    //       // Borrower	
    //       // Check Out Date	
    //       // Return Date	
    //       // Underlining Permitted?	
    //       // Notes	
    //       // ISBN (No Spaces/Dashes)																				
    // 
          // let newRow: NewRow = {};
          // let keys = [
          //   'author',
          //   'title',
          //   'editor',
          //   'edition',
          //   'keywords',
          //   'physical',
          //   'pdf',
          //   'url',
          //   'copies',
          //   'lender',
          //   'borrower',
          //   'checkout',
          //   'return',
          //   'underlining',
          //   'notes',
          //   'isbn',
          // ]
    //       // let nullcount = 0;
    //       await row.forEach(function(c, j){
    //         // const authorKey = /author\(s\)/gi.test(c);
    //         // const titleKey = /title/gi.test(c);
    //         // const editorKey = /translator\(s\)/gi.test(c);
    //         // const editionKey = /edition/gi.test(c);
    //         // const keywordsKey = /keywords/gi.test(c);
    //         // const physicalCopyKey = /physical\scopy/gi.test(c);
    //         // const pdfCopyKey = /pdf\scopy/gi.test(c);
    //         // const freeOnlineKey = /free\sonline/gi.test(c);
    //         // const copiesKey = /of\scopies/gi.test(c);
    //         // const lenderKey = /lender/gi.test(c);
    //         // const borrowerKey = /borrower/gi.test(c);
    //         // const checkoutKey = /check\sout/gi.test(c);
    //         // const returnKey = /return\sdate/gi.test(c);
    //         // const underliningPermittedKey = /underlining\spermitted/gi.test(c);
    //         // const notesKey = /notes/gi.test(c);
    //         // const isbnKey = /isbn/gi.test(c);
    //         if (i === 2) {
    //           hr.push(c)
    //         } else if (i > 2){
    //           if (!c || c === 'undefined') {
    //             c = null;
    //             // nullcount++;
    //           }
    //           newRow[keys[j]] = c;
    //         }
    //       });
    //       if (i > 2) await this.handleAddBook(newRow);
    //     });
    // 
    //   })
    // })
  }
  
  public render() {
      // return (<div></div>)
      // console.log(envConfig.googleApplicationCredentials);

      return (
        <GooglePicker 
        //clientId={this.clientId}//'your-client-id'
                developerKey={this.developerKey}//'your-developer-key'
                scope={this.scopes}
                onChange={this.pickerCallback}
                onAuthenticate={token => console.log('oauth token:', token)}
                onAuthFailed={data => console.log('on auth failed:', data)}
                multiselect={false}
                navHidden={true}
                authImmediate={false}
                viewId={'SPREADSHEETS'}>
      
      
        </GooglePicker>
      )
      // <DialogActions>
      //     <Button variant="contained" color="primary" onClick={this.handleAddBook}>
      //         Looks good!
      //     </Button>
      // </DialogActions>
      // return (
      //   <GooglePicker clientId={CLIENT_ID}
      //       developerKey={DEVELOPER_KEY}
      //       scope={scopes}
      //       onChange={data => console.log('on change:', data)}
      //       onAuthFailed={data => console.log('on auth failed:', data)}
      //       multiselect={true}
      //       navHidden={true}
      //       authImmediate={false}
      //       viewId={'FOLDERS'}
      //       createPicker={ (google, oauthToken) => {
      //         const googleViewId = google.picker.ViewId.FOLDERS;
      //         const docsView = new google.picker.DocsView(googleViewId)
      //             .setIncludeFolders(true)
      //             .setMimeTypes('application/vnd.google-apps.folder')
      //             .setSelectFolderEnabled(true);
      // 
      //         const picker = new window.google.picker.PickerBuilder()
      //             .addView(docsView)
      //             .setOAuthToken(oauthToken)
      //             .setDeveloperKey(DEVELOPER_KEY)
      //             .setCallback(()=>{
      //               console.log('Custom picker is ready!');
      //             });
      // 
      //         picker.build().setVisible(true);
      //       }}
      //   >
      //     <span>Click</span>
      //     <div className="google"></div>
      //   </GooglePicker>
      // )
  }
}

export default SyncGoogleSheetDialog;
