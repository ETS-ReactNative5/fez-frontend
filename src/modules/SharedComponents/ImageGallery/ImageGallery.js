import React from 'react';

import PropTypes from 'prop-types';
import ImageList from '@material-ui/core/ImageList';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { pathConfig } from 'config/pathConfig';
import { default as config } from 'config/imageGalleryConfig';
import ImageGalleryItem from './ImageGalleryItem';

const useStyles = makeStyles(
    theme => ({
        imageListItemRoot: {
            [theme.breakpoints.down('xs')]: {},
            height: '100% !important',
            // },
        },
    }),
    { withTheme: true },
);

export const getItemUrl = pid => {
    return pathConfig.records.view(pid);
};

const ImageGallery = ({
    publicationsList,
    classes,
    lazyLoading,
    itemWidth,
    itemHeight,
    itemsPerRow,
    security,
    ...rest
}) => {
    const internalClasses = useStyles();

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    // const xl = useMediaQuery(theme.breakpoints.up('xl'));

    // eslint-disable-next-line no-nested-ternary
    const cols = itemsPerRow ?? lg ? 4 : md ? 3 : sm ? 2 : 1;

    return (
        <ImageList
            rowHeight={itemHeight}
            cols={cols}
            classes={{ root: `${internalClasses.imageListRoot} ${classes?.imageList?.root ?? ''}` }}
            id={'image-gallery'}
            data-testid={'image-gallery'}
            {...rest}
        >
            {publicationsList.map(item => (
                <ImageGalleryItem
                    key={item.rek_pid}
                    item={item}
                    url={getItemUrl(item.rek_pid)}
                    lazyLoading={lazyLoading}
                    itemWidth={itemWidth}
                    itemHeight={itemHeight}
                    classes={{
                        imageListItem: { root: internalClasses.imageListItemRoot },
                        imageListItemBar: internalClasses.imageListItemBar,
                    }}
                    security={security}
                />
            ))}
        </ImageList>
    );
};

ImageGallery.propTypes = {
    publicationsList: PropTypes.array.isRequired,
    security: PropTypes.object,
    classes: PropTypes.shape({
        imageList: PropTypes.object,
        imageListItem: PropTypes.object,
        imageListItemBar: PropTypes.object,
    }),
    lazyLoading: PropTypes.bool,
    itemWidth: PropTypes.number,
    itemHeight: PropTypes.number,
    itemsPerRow: PropTypes.number,
};

ImageGallery.defaultProps = {
    classes: {},
    security: { isAdmin: false, isAuthor: false },
    lazyLoading: config.thumbnailImage.defaultLazyLoading,
    itemWidth: config.thumbnailImage.defaultWidth,
    itemHeight: config.thumbnailImage.defaultHeight,
    // itemsPerRow: config.thumbnailImage.defaultItemsPerRow,
};

export default React.memo(ImageGallery);
