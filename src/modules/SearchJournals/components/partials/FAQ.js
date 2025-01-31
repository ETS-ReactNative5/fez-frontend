import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import locale from '../../../../locale/components';
import { StandardRighthandCard } from 'modules/SharedComponents/Toolbox/StandardRighthandCard';

const Accordion = styled(props => <MuiAccordion elevation={0} square {...props} />)(({ theme }) => ({
    backgroundColor: 'transparent',
    paddingTop: theme.spacing(0),
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled(props => <MuiAccordionSummary {...props} />)(({ theme }) => ({
    flexDirection: 'row-reverse',
    padding: theme.spacing(0),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const FAQ = ({}) => {
    const txt = locale.components.searchJournals.partials.FAQ;
    const [expanded, setExpanded] = React.useState();
    const handleChange = faq => (e, expanded) => {
        setExpanded(expanded ? faq : false);
    };

    return (
        <StandardRighthandCard title={txt.title} help={txt.help} testId="search-journals-faq">
            {txt.items.map((faq, index) => (
                <Accordion
                    expanded={expanded === `faq-${index}`}
                    onChange={handleChange(`faq-${index}`)}
                    key={`faq-${index}`}
                >
                    <AccordionSummary
                        aria-controls={`faq-content-${index}`}
                        id={`faq-summary-${index}`}
                        data-testid={`faq-summary-${index}`}
                    >
                        <Typography>
                            <a>{faq.question}</a>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails id={`faq-details-${index}`} data-testid={`faq-details-${index}`}>
                        {faq.answer}
                    </AccordionDetails>
                </Accordion>
            ))}
        </StandardRighthandCard>
    );
};

export default React.memo(FAQ);
