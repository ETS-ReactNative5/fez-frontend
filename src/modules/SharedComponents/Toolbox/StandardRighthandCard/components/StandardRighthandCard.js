import React from 'react';
import PropTypes from 'prop-types';
import {HelpIcon} from '../../HelpDrawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    title: {
        minWidth: 1,
    },
    divider: {
        marginTop: 6,
        marginBottom: 12
    }
};

class RighthandCard extends React.Component {
    static propTypes ={
        classes: PropTypes.object,
        children: PropTypes.any,
        title: PropTypes.string,
        help: PropTypes.shape({
            title: PropTypes.string,
            text: PropTypes.any,
            buttonLabel: PropTypes.string
        })
    };

    render() {
        const {classes, title, children, help} = this.props;
        return (
            <Grid container>
                <Grid item xs className={classes.title}>
                    {title &&
                    <Typography variant={'h6'} color={'primary'}>{title}</Typography>}
                </Grid>
                {help && help.text &&
                <Grid item>
                    <HelpIcon {...help}/>
                </Grid>
                }
                <Grid item xs={12}>
                    <Divider className={classes.divider} />
                </Grid>
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        );
    }
}

const StyledCard = withStyles(styles, {withTheme: true})(RighthandCard);
const StandardRighthandCard = (props) => <StyledCard {...props}/>;
export default StandardRighthandCard;
