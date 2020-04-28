import * as React from 'react';
import { Fab, withStyles, Hidden, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { inject, observer } from 'mobx-react';
import { UserStore } from 'stores';
import { UserProfilePanel } from 'component';
import { AddContentDialog, LibraryView, SyncGoogleSheetDialog } from 'component/content';
import { Book } from 'data/models';

const styles: any = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        background: theme.palette.primary.main
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    addBookButton: {
        alignSelf: 'center'
    },
    syncGoogleSheetButton: {
        alignSelf: 'center'
    }
});

interface IProfileRouteProps {
    userStore: UserStore;
    classes?: any;
    match: any;
    history: any;
}

interface IProfileRouteState {
    addContentOpen: boolean;
    syncGoogleSheetOpen: boolean;
    lenderBooks: Book[] | null;
}

@inject('userStore')
@observer
class Profile extends React.Component<IProfileRouteProps, IProfileRouteState> {

    state = {
        addContentOpen: false,
        syncGoogleSheetOpen: false,
        lenderBooks: null
    }

    public render() {
        const { classes, userStore, match, history } = this.props;
        
        return (
            <div className={classes.content}>
                <UserProfilePanel userStore={userStore} />

                <AddContentDialog open={this.state.addContentOpen} onClose={this.setAddContentVisibility(false)}/>
                <SyncGoogleSheetDialog open={this.state.syncGoogleSheetOpen} onClose={this.setSyncGoogleSheetVisibility(false)}/>

                {/* <LenderContentGrid onAddContent={this.setAddContentVisibility}/> //TODO: Remove this :)*/}
                <LibraryView variant={'user'} match={match} history={history}/>

                <Button className={classes.addBookButton} variant="contained" color="primary" onClick={this.setAddContentVisibility(true)}>
                    Add A Book
                </Button>
                <Hidden mdUp>
                    {this.state.addContentOpen ?
                        null
                        :
                        <Fab className={classes.fab} onClick={this.setAddContentVisibility(true)}>
                            <AddIcon />
                        </Fab>
                    }
                </Hidden>
                <Button className={classes.syncGoogleSheetButton} variant="contained" color="primary" onClick={this.setSyncGoogleSheetVisibility(true)}>
                    Sync With Google Sheet
                </Button>
                <Hidden mdUp>
                    {this.state.syncGoogleSheetOpen ?
                        null
                        :
                        <Fab className={classes.fab} onClick={this.setSyncGoogleSheetVisibility(true)}>
                            <AddIcon />
                        </Fab>
                    }
                </Hidden>
            </div>
        )
    }

    setAddContentVisibility = (visible: boolean) => () => {
        this.setState({
            addContentOpen: visible
        });
    };
    setSyncGoogleSheetVisibility = (visible: boolean) => () => {
        this.setState({
            syncGoogleSheetOpen: visible
        });
    };
}

export default withStyles(styles)(Profile);