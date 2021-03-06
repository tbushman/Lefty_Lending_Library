import * as React from 'react';
import { withStyles, CircularProgress, Table, TableHead, TableRow, TableCell, Paper, Typography, TableBody } from '@material-ui/core';
import { Book, BookLenderInfo } from 'data/models';
import { inject, observer } from 'mobx-react';
import { BookStore, UserStore, userStore } from 'stores';
import { observable } from 'mobx';
import LockIcon from '@material-ui/icons/Lock';

const styles: any = (theme: any) => ({
    root:{
        width: '100%',
        maxWidth: '100px'
    },
    centeredParent: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        minWidth: '50px',
        minHeight: '50px'
    },
    warningParent: {
        padding: theme.spacing.unit
    }
});

interface IBookLenderTableInfo{
    book: Book;

    bookStore?: BookStore;
    userStore?: UserStore;
    classes: any;
}

@inject('bookStore','userStore')
@observer
class BookLenderTable extends React.Component<IBookLenderTableInfo, any>{
    @observable
    private bookLenderInfos: BookLenderInfo[];

    constructor(props: any){
        super(props);
        if(this.props.userStore!.isLoggedIn){
            this.fetchBookLenderInfos();
            return;
        }
    }

    private fetchBookLenderInfos = () => {
        if(!this.bookLenderInfos){
            this.props.bookStore!.getBookLenderInfos(this.props.book.isbn13).then(res => {
                this.bookLenderInfos = res;
            });
        }
    }
    
    componentDidUpdate() {
        this.fetchBookLenderInfos();
    }

    public render(){
        const { classes, book } = this.props;
        if(this.bookLenderInfos){
            return(
                <Table className={classes.root} padding='dense'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Lender</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Markup Permission</TableCell>
                            <TableCell>Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.bookLenderInfos.map(lenderInfo => {
                            return(
                                <TableRow key={lenderInfo.LenderEmail}>
                                    <TableCell>{lenderInfo.LenderName}</TableCell>
                                    <TableCell>{lenderInfo.LenderEmail}</TableCell>
                                    <TableCell>{lenderInfo.Condtion}</TableCell>
                                    <TableCell>{lenderInfo.PermissionToMarkup ? '👍🏻' : '⛔'}</TableCell>
                                    <TableCell>{lenderInfo.Quantity}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            );
        }
        else if(!userStore!.isLoggedIn){
            return(
                <div className={classes.centeredParent}>
                    <Paper className={classes.warningParent}>
                        <LockIcon/>
                        {book.Lenders.length > 1 ?
                            <Typography variant="h5">{`This book has ${book.Lenders.length} Lenders!`}</Typography>
                            :
                            <Typography variant="h5">{`This book has a Lender!`}</Typography>
                        }
                        <Typography variant="subtitle1">{`Login to see who ${book.Lenders.length > 1 ? 'they are' : 'it is'} and start Lending!`}</Typography>
                    </Paper>
                </div>
            );
        }
        else{
            return(
                <div className={classes.centeredParent}>
                    <CircularProgress className={classes.progress}/>
                </div>
            );
        }
    }
}

export default withStyles(styles)(BookLenderTable);