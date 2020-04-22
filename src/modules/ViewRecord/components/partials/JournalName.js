import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { default as globalLocale } from 'locale/global';
import { default as viewRecordLocale } from 'locale/viewRecord';
import { pathConfig } from 'config/routes';
import { ExternalLink } from 'modules/SharedComponents/ExternalLink';
import { Link } from 'react-router-dom';

export default class JournalName extends PureComponent {
    static propTypes = {
        publication: PropTypes.object.isRequired,
    };

    // fez_journal_issns returns era data
    getERAYears = (issns = []) => {
        const years = [];
        issns.map(issn => {
            if (Array.isArray(issn.fez_journal_issns) && issn.fez_journal_issns.length > 0) {
                issn.fez_journal_issns.map(journalIssn => {
                    if (journalIssn.fez_journal && !years.includes(journalIssn.fez_journal.jnl_era_year)) {
                        years.push(journalIssn.fez_journal.jnl_era_year);
                    }
                });
            }
        });

        return years;
    };

    getSherpaRomeo = issns => {
        const filteredIssns = issns.filter(issn => !!issn.fez_sherpa_romeo && !!issn.fez_sherpa_romeo.srm_journal_link);
        return filteredIssns.length > 0
            ? { issn: filteredIssns[0].rek_issn, url: filteredIssns[0].fez_sherpa_romeo.srm_journal_link }
            : null;
    };

    renderSherpaRomeo = issns => {
        const sherpaRomeoData = this.getSherpaRomeo(issns);
        let sherpaRomeoElement = <span />;
        if (sherpaRomeoData) {
            sherpaRomeoElement = (
                <span>
                    {' '}
                    <ExternalLink href={sherpaRomeoData.url} aria-label={globalLocale.global.sherpaRomeoLink.ariaLabel}>
                        {viewRecordLocale.viewRecord.linkTexts.journalOpenAccessPolicyLink}
                    </ExternalLink>
                </span>
            );
        }

        return sherpaRomeoElement;
    };

    renderJournalName = (journalName, issns) => {
        const eraYears = this.getERAYears(issns);
        const eraJournalListedText =
            eraYears && eraYears.length > 0
                ? viewRecordLocale.viewRecord.linkTexts.eraJournalListed.replace('[year]', eraYears.join(', '))
                : '';
        return (
            <React.Fragment>
                <Link to={pathConfig.list.journalName(journalName)}>
                    <span>{journalName}</span>
                </Link>
                {eraJournalListedText && <span className={'eraYearListed'}> {eraJournalListedText}</span>}
            </React.Fragment>
        );
    };

    render() {
        const { publication } = this.props;

        return (
            <span>
                {publication.fez_record_search_key_journal_name &&
                    publication.fez_record_search_key_journal_name.rek_journal_name &&
                    this.renderJournalName(
                        publication.fez_record_search_key_journal_name.rek_journal_name,
                        publication.fez_record_search_key_issn,
                    )}
                {publication.fez_record_search_key_journal_name &&
                    publication.fez_record_search_key_issn &&
                    this.renderSherpaRomeo(publication.fez_record_search_key_issn)}
            </span>
        );
    }
}
