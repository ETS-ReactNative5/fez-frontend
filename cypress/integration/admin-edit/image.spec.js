import { default as recordList } from '../../../src/mock/data/records/publicationTypeListImage';

context('Image admin edit', () => {
    const record = recordList.data[0];

    beforeEach(() => {
        cy.loadRecordForAdminEdit(record.rek_pid);
    });

    afterEach(() => {
        cy.adminEditCleanup();
    });

    it('should load with specifed elements', () => {
        cy.adminEditCountCards(7);
        cy.adminEditNoAlerts();
        cy.adminEditTabbedView();
        cy.adminEditCheckDefaultTab('Bibliographic');
    });

    it('should render the different sections as expected', () => {
        // ------------------------------------------ BIBLIOGRAPHIC TAB ----------------------------------------------
        cy.log('Bibliographic tab');
        cy.get('.StandardPage form > div > div')
            .get('.StandardCard')
            .eq(1)
            .as('bibliographicTab')
            .within(() => {
                cy.get('h3')
                    .should('have.text', 'Bibliographic');

                cy.get('.AdminCard')
                    .eq(2)
                    .within(() => {
                        cy.get('h4')
                            .should('contain', 'Bibliographic');

                        cy.get('#Type')
                            .should('have.value', record.rek_genre);
                        cy.get('#Originalformat')
                            .should(
                                'have.value',
                                record.fez_record_search_key_original_format.rek_original_format,
                            );
                        cy.get('#Source')
                            .should('have.value', record.fez_record_search_key_source.rek_source);
                        cy.get('#Copyrightnotice')
                            .should('have.value', record.fez_record_search_key_rights.rek_rights);

                        cy.get('label[id="Licence-label"]')
                            .parent()
                            .find('input[type=hidden]')
                            .should('have.value', record.fez_record_search_key_license.rek_license)
                            .siblings('[role=button]')
                            .contains(record.fez_record_search_key_license.rek_license_lookup);
                    });
            });
    });
});
