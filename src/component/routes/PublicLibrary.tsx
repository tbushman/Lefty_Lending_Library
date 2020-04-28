import * as React from 'react';

import { withStyles } from '@material-ui/core';
import { LibraryView } from 'component/content';

const styles: any = (theme: any) => ({
    tightTop: {
        marginTop: -theme.spacing(1)
    }
});

class PublicLibrary extends React.Component<any, any> {

    public render() {
        const {match, history, classes} = this.props;
        return (
            <div className={classes.tightTop} style={{top:window.innerWidth > 600 ? '111px' : '103px',bottom:0,position:'static'}}>
                <LibraryView variant={'public'} match={match} history={history} />
            </div>
        )
    }
}

export default withStyles(styles)(PublicLibrary);