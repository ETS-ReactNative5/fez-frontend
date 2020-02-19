import { default as recordList } from '../../../src/mock/data/records/publicationTypeListConferenceProceedings';
import _filterProps from '../../../src/modules/SharedComponents/Toolbox/helpers/_filterProps';

context('Conference Proceedings admin edit', () => {
    const record = recordList.data[0];
    const {
        dsi_dsid: visibleFilename,
        dsi_label: visibleFileDescription,
        dsi_security_policy: visibleFileSecurityPolicy,
    } = record.fez_datastream_info[0];
    // const { dsi_dsid: hiddenFilename } = record.fez_datastream_info[1];

    beforeEach(() => {
        cy.loadRecordForAdminEdit(record.rek_pid);
    });

    afterEach(() => {
        cy.adminEditCleanup();
    });

    it('should load expected tabs', () => {
        cy.adminEditCountCards(7);
        cy.adminEditVerifyAlerts(1, ['Author/creator names are required']);
        cy.adminEditTabbedView();
        cy.adminEditCheckDefaultTab('Bibliographic');
        cy.adminEditCheckTabErrorBadge(2);
    });

    it('should render the different sections as expected', () => {
        // ------------------------------------------ BIBLIOGRAPHIC TAB ----------------------------------------------
        cy.log('Bibliographic tab');
        cy.get('.StandardPage form > div > div')
            .get('.StandardCard')
            .eq(1)
            .as('biblographicTab')
            .within(() => {
                cy.get('h4')
                    .should('contain', 'Title of proceedings');
            });

        // ------------------------------------------ AUTHOR DETAILS TAB ---------------------------------------------
        cy.log('Author Details tab');
        cy.get('.StandardPage form > div > div')
            .get('.StandardCard')
            .eq(2)
            .as('authorDetailsTab')
            .within(() => {
                cy.get('h4')
                    .should('contain', 'Authors');
                cy.get('#authors-name-as-published-field')
                    .type('Author{enter}');
            });
        cy.adminEditNoAlerts();

        // ---------------------------------------------- FILES TAB --------------------------------------------------
        cy.log('Files tab');
        cy.get('.StandardPage form > div > div')
            .get('.StandardCard')
            .eq(6)
            .as('filesTab')
            .within(() => {
                cy.get('h4')
                    .should('have.text', 'Attached files');

                cy.get('[class*=MuiCardContent-root] > div')
                    .within(() => {
                        cy.get(`a[title="${visibleFilename}"]`)
                            .should('have.length', 1);

                        // TODO: Write test for file hidden as per new logic
                        // cy.get(`a[title="${hiddenFilename}"]`)
                        //     .should('have.length', 0);

                        cy.get('input[name=fileDescription]')
                            .should('have.value', visibleFileDescription);
                    });
            });

        // --------------------------------------------- SECURITY TAB ------------------------------------------------
        cy.log('Security tab');
        cy.get('.StandardPage form >div>div')
            .get('.StandardCard')
            .eq(7)
            .as('securityTab')
            .within(() => {
                cy.get('h4')
                    .eq(1)
                    .should('have.text', `Datastream level security - ${record.rek_pid}`);
                cy.get('.StandardCard')
                    .eq(1)
                    .within(() => {
                        cy.get('h6')
                            .eq(0)
                            .should('have.text', 'Inherited datastream security policy details');
                    });

                record.fez_record_search_key_ismemberof.forEach((collection, index) => {
                    cy.get('h6')
                        .eq(2 * index + 1)
                        .should('have.text', collection.rek_ismemberof);
                    cy.get('h6')
                        .eq(2 * index + 2)
                        .should('have.text', collection.rek_ismemberof_lookup);
                    cy.get('p')
                        .eq(index)
                        .should('have.text', `Public (${collection.parent.rek_security_policy})`);
                });
                cy.get('h6')
                    .contains('Override datastream security policy details')
                    .siblings('div')
                    .as('dsiPolicyBlock')
                    .find(`a[title="${visibleFilename}"]`)
                    .should('have.text', visibleFilename);
                cy.get('@dsiPolicyBlock')
                    .find(`input[name="${visibleFilename}"]`)
                    .should('have.value', visibleFileSecurityPolicy.toString());
            });
    });
});
