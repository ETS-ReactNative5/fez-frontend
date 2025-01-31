import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'modules/SharedComponents/Toolbox/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { MAX_PUBLIC_SEARCH_TEXT_LENGTH } from 'config/general';
import { locale } from 'locale';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';

export const styles = theme => ({
    searchIconPrefix: {
        fill: theme.palette.secondary.main,
        opacity: 0.66,
    },
    inHeader: {
        backgroundColor: theme.palette.white.main,
        '& input[type="search"]::-webkit-search-cancel-button': {
            display: 'none',
        },
    },
    searchIconMobile: {
        fill: theme.palette.white.main,
    },
    mobileCloseButton: {
        fill: theme.palette.secondary.main,
        opacity: 0.5,
    },
    mobileHeader: {
        zIndex: 100,
        backgroundColor: theme.palette.white.main,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 70,
    },
    mobileSearchInput: {
        width: '99%',
        height: 70,
        '& > div': {
            height: '100%',
        },
        '& input': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 24,
            lineHeight: 1.2,
            fontWeight: theme.typography.fontWeightNormal,
        },
    },
});

export class SimpleSearchComponent extends PureComponent {
    static propTypes = {
        searchText: PropTypes.string,
        autoFocus: PropTypes.bool,

        isInHeader: PropTypes.bool,
        showSearchButton: PropTypes.bool,
        showMobileSearchButton: PropTypes.bool,
        showAdvancedSearchButton: PropTypes.bool,
        showPrefixIcon: PropTypes.bool,

        onSearch: PropTypes.func,
        onSearchTextChange: PropTypes.func.isRequired,
        onToggleSearchMode: PropTypes.func,
        onInvalidSearch: PropTypes.func,

        classes: PropTypes.object,
    };
    static defaultProps = {
        searchText: '',

        isInHeader: false,
        showSearchButton: false,
        showMobileSearchButton: false,
        showAdvancedSearchButton: false,
        showPrefixIcon: false,

        onSearch: () => {},
        onToggleSearchMode: () => {},
        onInvalidSearch: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            showMobile: false,
            /* istanbul ignore next */
            searchTerm: this.props.searchText,
        };
    }

    searchTextValidationMessage = value => {
        if (!!value && typeof value === 'string' && value.trim().length > MAX_PUBLIC_SEARCH_TEXT_LENGTH) {
            return locale.validationErrors.maxLength.replace('[max]', MAX_PUBLIC_SEARCH_TEXT_LENGTH);
        }

        return null;
    };

    _handleToggleMobile = () => {
        this.setState(
            {
                ...this.state,
                showMobile: !this.state.showMobile,
            },
            () => {
                if (this.state.showMobile) {
                    document.getElementById('mobile-search-input') &&
                        /* istanbul ignore next */
                        document.getElementById('mobile-search-input').focus();
                }
            },
        );
    };

    _handleSearchTextChange = event => {
        this.setState({ searchTerm: event.target.value });
        this.props.onSearchTextChange(event.target.value);
    };

    _handleSearchMode = () => {
        !!this.props.onToggleSearchMode && this.props.onToggleSearchMode();
    };

    _handleSearch = event => {
        if (event && event.key && event.key !== 'Enter') return;
        /* istanbul ignore next */
        if (this.state.searchTerm && this.state.searchTerm.trim().length === 0) return;

        if (this.props.searchText.trim().length > MAX_PUBLIC_SEARCH_TEXT_LENGTH) {
            this.props.onInvalidSearch(
                locale.validationErrors.maxLength.replace('[max]', MAX_PUBLIC_SEARCH_TEXT_LENGTH),
            );
            return;
        }

        // Hide the mobile search bar after performing a search
        this.setState({
            ...this.state,
            showMobile: false,
        });

        // Perform search
        this.props.onSearch();

        // Blur the input so the mobile keyboard is deactivated
        event && event.target && event.target.blur();
    };

    _handleSubmit = event => {
        event.preventDefault();
    };

    render() {
        const txt = locale.components.searchComponent;
        const { classes } = this.props;
        const ariaLabel = { 'aria-label': txt.ariaInputLabel };
        return (
            <React.Fragment>
                <form style={{ margin: 8 }} onSubmit={this._handleSubmit}>
                    {this.props.isInHeader ? (
                        <React.Fragment>
                            {/* DESKTOP in header */}
                            <Hidden xsDown>
                                <Grid
                                    container
                                    alignItems={'center'}
                                    spacing={1}
                                    wrap={'nowrap'}
                                    className={classes.inHeader}
                                    direction={'row'}
                                >
                                    {this.props.showPrefixIcon && (
                                        <Grid item xs={'auto'}>
                                            <Search className={classes.searchIconPrefix} />
                                        </Grid>
                                    )}
                                    <Grid item xs>
                                        <TextField
                                            textFieldId="simple-search"
                                            type="search"
                                            autoComplete={'search'}
                                            fullWidth
                                            autoFocus={this.props.autoFocus}
                                            label={''}
                                            placeholder={txt.searchBoxPlaceholder}
                                            onChange={this._handleSearchTextChange}
                                            onKeyPress={this._handleSearch}
                                            value={this.props.searchText}
                                            InputProps={{ disableUnderline: true }}
                                            errorText={this.searchTextValidationMessage(this.props.searchText)}
                                        />
                                    </Grid>
                                </Grid>
                            </Hidden>
                            {/* MOBILE in header */}
                            <Hidden smUp>
                                {!this.state.showMobile ? (
                                    <Tooltip
                                        title={txt.searchBoxPlaceholder}
                                        placement="bottom-end"
                                        TransitionComponent={Fade}
                                        TransitionProps={{ timeout: 300 }}
                                    >
                                        <IconButton
                                            onClick={this._handleToggleMobile}
                                            aria-label={txt.mobileSearchButtonAriaLabel}
                                        >
                                            <Search className={classes.searchIconMobile} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <div className={classes.mobileHeader}>
                                        <Grid
                                            container
                                            spacing={0}
                                            direction={'row'}
                                            wrap={'nowrap'}
                                            alignItems={'center'}
                                            justifyContent={'center'}
                                        >
                                            {this.props.showMobileSearchButton && (
                                                <Hidden smUp>
                                                    <Grid item>
                                                        <IconButton
                                                            onClick={this._handleToggleMobile}
                                                            className={classes.mobileSearchButtons}
                                                        >
                                                            <Close
                                                                className={classes.mobileCloseButton}
                                                                fontSize="inherit"
                                                            />
                                                        </IconButton>
                                                    </Grid>
                                                </Hidden>
                                            )}
                                            <Grid item xs zeroMinWidth>
                                                <TextField
                                                    className={classes.mobileSearchInput}
                                                    type="search"
                                                    id="mobileSearchField"
                                                    textFieldId="mobile-search"
                                                    fullWidth
                                                    label={''}
                                                    placeholder={txt.searchBoxPlaceholder}
                                                    inputProps={ariaLabel}
                                                    onChange={this._handleSearchTextChange}
                                                    onKeyPress={this._handleSearch}
                                                    value={this.state.searchTerm}
                                                    InputProps={{ disableUnderline: true }}
                                                    error={this.searchTextValidationMessage(this.props.searchText)}
                                                />
                                            </Grid>
                                            {this.props.showMobileSearchButton && (
                                                <Hidden smUp>
                                                    <Grid item>
                                                        <IconButton
                                                            onClick={this._handleSearch}
                                                            disabled={this.state.searchTerm.trim().length === 0}
                                                            className={classes.mobileSearchButtons}
                                                        >
                                                            <ArrowForward fontSize="inherit" />
                                                        </IconButton>
                                                    </Grid>
                                                </Hidden>
                                            )}
                                        </Grid>
                                    </div>
                                )}
                            </Hidden>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {/* NOT in header */}
                            <Grid container spacing={2} alignItems={'center'}>
                                <Grid item xs>
                                    <TextField
                                        textFieldId="simple-search"
                                        type="search"
                                        data-testid
                                        fullWidth
                                        label={txt.searchBoxPlaceholder}
                                        placeholder={txt.searchBoxHint}
                                        inputProps={ariaLabel}
                                        onChange={this._handleSearchTextChange}
                                        onKeyPress={this._handleSearch}
                                        value={this.props.searchText}
                                        errorText={this.searchTextValidationMessage(this.props.searchText)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={'auto'}>
                                    <Button
                                        children={txt.searchButtonText}
                                        aria-label={txt.searchButtonAriaLabel}
                                        variant={'contained'}
                                        color={'primary'}
                                        disabled={!!this.searchTextValidationMessage(this.props.searchText)}
                                        onClick={this._handleSearch}
                                        fullWidth
                                        id="simple-search-button"
                                        data-testid="simple-search-button"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={'auto'}>
                                    <Button
                                        variant={'contained'}
                                        children={txt.advancedSearchButtonText}
                                        aria-label={txt.advancedSearchButtonAriaLabel}
                                        onClick={this._handleSearchMode}
                                        className="advancedButton"
                                        fullWidth
                                        id="show-advanced-search"
                                        data-testid="show-advanced-search"
                                    />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )}
                </form>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SimpleSearchComponent);
