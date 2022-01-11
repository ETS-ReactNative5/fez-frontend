import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function DetailedHistory() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant="h5">Detailed History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={4} style={{ color: '#fff', backgroundColor: '#51247A', paddingLeft: '5px' }}>
                            <span>Date</span>
                        </Grid>
                        <Grid item xs={8} style={{ color: '#fff', backgroundColor: '#51247A', paddingLeft: '5px' }}>
                            <span>Event</span>
                        </Grid>
                        {/* Data Elements */}
                        <Grid item xs={4}>
                            <span>Thu, 30 Dec 2021, 19:41:33 EST</span>
                        </Grid>
                        <Grid item xs={8}>
                            <span>Merged metadata in external source orcid (Author Id:76019)</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span>Thu, 30 Dec 2021, 19:38:01 EST</span>
                        </Grid>
                        <Grid item xs={8}>
                            <span>Merged metadata from external source scopus</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span>Thu, 30 Dec 2021, 19:41:33 EST</span>
                        </Grid>
                        <Grid item xs={8}>
                            <span>Merged metadata in external source orcid (Author Id:76019)</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span>Thu, 30 Dec 2021, 19:41:33 EST</span>
                        </Grid>
                        <Grid item xs={8}>
                            <span>Merged metadata from external source scopus</span>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
