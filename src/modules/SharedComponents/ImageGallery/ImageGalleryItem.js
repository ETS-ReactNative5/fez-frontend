import React from 'react';

import PropTypes from 'prop-types';

import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import txt from 'locale/components';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { default as config } from 'config/imageGalleryConfig';
import ImageGalleryItemImage from './ImageGalleryItemImage';

const useStyles = makeStyles(theme => ({
    imageListItemRoot: {
        [theme.breakpoints.down('md')]: {
            width: '25% !important',
        },
        [theme.breakpoints.down('sm')]: {
            width: '33% !important',
        },
        [theme.breakpoints.down('xs')]: {
            width: '50% !important',
        },
    },
    imageListItemItem: {
        backgroundColor: '#51247a',
    },
    imageListItemWithLink: {
        cursor: 'pointer',
    },
    imageListItemBarRoot: {
        height: '67px',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        padding: '10px',
    },
    imageListItemBarTitle: {
        fontSize: '12px',
        lineHeight: '16px',
        display: '-webkit-box',
        lineClamp: 3,
        boxOrient: 'vertical',
        overflow: 'hidden',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
    },
    imageListItemBarTitleWrap: {
        margin: 0,
    },
    imageGalleryItemImage: {
        aspectRatio: 1,
        minWidth: '100px',
        minHeight: '100px',
        width: '100%',
        height: '100%',
        [theme.breakpoints.up('md')]: {
            minWidth: '150px',
            minHeight: '150px',
        },
    },
    titleBar: {
        background: 'none',
        height: '30px',
    },
    icon: {
        color: 'white',
        filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.5))',
        cursor: 'default',
    },
    tooltip: {
        cursor: 'default',
    },
}));

function viewRecord(history, url) {
    history.push(url);
}

const ImageGalleryItem = ({
    item,
    withTitle,
    url,
    history,
    classes,
    lazyLoading,
    itemWidth,
    itemHeight,
    security,
    ...rest
}) => {
    const internalClasses = useStyles();
    const [restricted, setRestricted] = React.useState(false);
    const [advisory, setAdvisory] = React.useState(false);
    const historyObject = history ?? useHistory();

    const clickLink =
        !!url && url.length > 0
            ? {
                  onClick: e => viewRecord.call(e, historyObject, url),
                  role: 'button',
              }
            : {};
    const clickIcon =
        !!url && url.length > 0
            ? {
                  onClick: e => {
                      e.stopPropagation?.();
                      e.nativeEvent?.stopImmediatePropagation?.();
                  },
              }
            : {};

    return (
        <ImageListItem
            id={`image-gallery-item-${item.rek_pid}`}
            data-testid={`image-gallery-item-${item.rek_pid}`}
            classes={{
                root: `${internalClasses.imageListItemRoot} ${classes?.imageListItem?.root ?? ''}`,
                item: `${internalClasses.imageListItemItem} ${classes?.imageListItem?.item ?? ''} ${
                    !!clickLink.onClick ? internalClasses.imageListItemWithLink : ''
                }`,
            }}
            tabIndex={0}
            aria-label={`Thumbnail image showing ${item.rek_title}`}
            {...clickLink}
            {...rest}
        >
            <ImageGalleryItemImage
                item={item}
                security={security}
                alt={item.rek_title}
                width={itemWidth}
                height={itemHeight}
                loading={lazyLoading ? 'lazy' : 'eager'}
                className={`${internalClasses.imageGalleryItemImage} ${classes?.imageListItemImage ?? ''}`}
                setRestricted={setRestricted}
                setAdvisory={setAdvisory}
            />
            {withTitle && (
                <ImageListItemBar
                    title={item.rek_title}
                    classes={{
                        root: `${internalClasses.imageListItemBarRoot} ${classes?.imageListItemBar?.root ?? ''}`,
                        title: `${internalClasses.imageListItemBarTitle} ${classes?.imageListItemBar?.title ?? ''}`,
                        titleWrap: `${internalClasses.imageListItemBarTitleWrap} ${classes?.imageListItemBar
                            ?.titleWrap ?? ''}`,
                    }}
                />
            )}
            {restricted && (
                <ImageListItemBar
                    title={item.title}
                    position="top"
                    actionIcon={
                        <Tooltip
                            title={txt.components.imageGallery.tooltip.restricted}
                            enterTouchDelay={0}
                            leaveTouchDelay={2500}
                            id={`image-gallery-item-${item.rek_pid}-restricted-tooltip`}
                            data-testid={`image-gallery-item-${item.rek_pid}-restricted-tooltip`}
                        >
                            <LockOutlinedIcon
                                className={internalClasses.icon}
                                size="small"
                                id={`image-gallery-item-${item.rek_pid}-restricted`}
                                data-testid={`image-gallery-item-${item.rek_pid}-restricted`}
                                {...clickIcon}
                            />
                        </Tooltip>
                    }
                    actionPosition="left"
                    className={internalClasses.titleBar}
                />
            )}
            {advisory && (
                <ImageListItemBar
                    title={item.title}
                    position="top"
                    actionIcon={
                        <Tooltip
                            className={internalClasses.tooltip}
                            title={txt.components.imageGallery.tooltip.advisory}
                            enterTouchDelay={0}
                            leaveTouchDelay={2500}
                            id={`image-gallery-item-${item.rek_pid}-advisory-tooltip`}
                            data-testid={`image-gallery-item-${item.rek_pid}-advisory-tooltip`}
                        >
                            <ErrorOutlineOutlinedIcon
                                className={internalClasses.icon}
                                size="small"
                                id={`image-gallery-item-${item.rek_pid}-advisory`}
                                data-testid={`image-gallery-item-${item.rek_pid}-advisory`}
                                {...clickIcon}
                            />
                        </Tooltip>
                    }
                    actionPosition="right"
                    className={internalClasses.titleBar}
                />
            )}
        </ImageListItem>
    );
};

ImageGalleryItem.propTypes = {
    item: PropTypes.object.isRequired,
    withTitle: PropTypes.bool,
    url: PropTypes.string,
    history: PropTypes.object,
    security: PropTypes.object,
    classes: PropTypes.shape({
        imageListItem: PropTypes.shape({
            root: PropTypes.string,
            item: PropTypes.string,
        }),
        imageListItemImage: PropTypes.string,
        imageListItemBar: PropTypes.object,
    }),
    lazyLoading: PropTypes.bool,
    itemWidth: PropTypes.number,
    itemHeight: PropTypes.number,
};

ImageGalleryItem.defaultProps = {
    withTitle: true,
    classes: {},
    security: { isAdmin: false, isAuthor: false },
    lazyLoading: config.thumbnailImage.defaultLazyLoading,
    itemWidth: config.thumbnailImage.defaultWidth,
    itemHeight: config.thumbnailImage.defaultHeight,
};

export default React.memo(ImageGalleryItem);
