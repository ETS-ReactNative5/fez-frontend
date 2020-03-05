import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui//styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(
    theme => ({
        listItemGutters: {
            paddingLeft: theme.spacing(),
            paddingRight: theme.spacing(),
        },
        listText: {
            fontWeight: 400,
        },
    }),
    { withTheme: true },
);

export const FacetsFilterListItem = ({ title, disabled, nestedItems, id }) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const handleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    return (
        <Fragment key={`facet_fragment_${id}`}>
            <ListItem
                button
                disabled={disabled}
                id={`clickable-${id}`}
                key={`facet_filter_${id}`}
                classes={{
                    gutters: classes.listItemGutters,
                }}
                onClick={handleIsOpen}
            >
                <ListItemText disableTypography>
                    <Typography id={id} variant={'body2'} color={'textPrimary'} className={classes.listText}>
                        {title}
                    </Typography>
                </ListItemText>
                {isOpen ? <ExpandLess id={`expand-less-${id}`} /> : <ExpandMore id={`expand-more-${id}`} />}
            </ListItem>
            {isOpen && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    {nestedItems}
                </Collapse>
            )}
        </Fragment>
    );
};

FacetsFilterListItem.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    nestedItems: PropTypes.any,
    title: PropTypes.string,
};

export default React.memo(FacetsFilterListItem);
