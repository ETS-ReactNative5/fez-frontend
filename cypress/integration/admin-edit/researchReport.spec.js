import { default as recordList } from '../../../src/mock/data/records/publicationTypeListResearchReport';

context('Research Report admin edit', () => {
    const record = recordList.data[0];

    beforeEach(() => {
        cy.loadRecordForAdminEdit(record.rek_pid);
    });

    afterEach(() => {
        cy.adminEditCleanup();
    });

    it('should load with specified elements', () => {
        cy.adminEditCountCards(8);
        cy.adminEditNoAlerts();

        cy.adminEditTabbedView();
        cy.adminEditCheckDefaultTab('Bibliographic');
    });

    it('should render the different sections as expected', () => {
        // ------------------------------------------ BIBLIOGRAPHIC TAB ----------------------------------------------
        cy.log('Bibliographic tab');
        cy.get('.StandardPage form .StandardCard')
            .eq(1)
            .within(() => {
                cy.get('h3')
                    .should('have.text', 'Bibliographic');

                cy.get('.AdminCard')
                    .eq(4)
                    .within(() => {
                        cy.get('h4')
                            .should('contain', 'Bibliographic');

                        cy.get('#ParentPublication')
                            .should(
                                'have.value',
                                record.fez_record_search_key_parent_publication.rek_parent_publication,
                            );

                        cy.get('#Startpage')
                            .should(
                                'have.value',
                                record.fez_record_search_key_start_page.rek_start_page,
                            );
                        cy.get('#Endpage')
                            .should('have.value', record.fez_record_search_key_end_page.rek_end_page);
                        cy.get('[id="Totalpages/Extent"]')
                            .should(
                                'have.value',
                                record.fez_record_search_key_total_pages.rek_total_pages,
                            );
                        cy.get('#Reportnumber')
                            .should(
                                'have.value',
                                record.fez_record_search_key_report_number.rek_report_number,
                            );
                    });
            });

        // ------------------------------------------ ADMIN TAB ----------------------------------------------
        cy.log('Admin tab');
        cy.get('.StandardPage form .StandardCard')
            .eq(3)
            .within(() => {
                cy.get('h3')
                    .should('have.text', 'Admin');

                cy.get('.AdminCard')
                    .eq(1)
                    .within(() => {
                        cy.get('h4')
                            .should('contain', 'Additional information');

                        cy.get('[data-testid=rek-refereed-source-input]')
                            .should('have.value', record.fez_record_search_key_refereed_source.rek_refereed_source)
                            .get('[data-testid=rek-refereed-source-select]')
                            .should(
                                'have.text',
                                record.fez_record_search_key_refereed_source.rek_refereed_source_lookup,
                            );
                    });
            });

        // ---------------------------------------- GRANT INFORMATION TAB --------------------------------------------
        cy.log('Grant Information tab');
        cy.get('.StandardPage form .StandardCard')
            .eq(5)
            .within(() => {
                cy.get('h3')
                    .should('have.text', 'Grant information');

                cy.get('.AdminCard')
                    .eq(0)
                    .within(() => {
                        cy.get('h4')
                            .should('contain', 'Grant information');

                        const numberItemsInRow = 3;
                        record.fez_record_search_key_grant_agency.map((pub, index) => {
                            cy.get('p')
                                .eq(index * numberItemsInRow)
                                .should('have.text', pub.rek_grant_agency);
                        });
                        record.fez_record_search_key_grant_id.map((id, index) => {
                            cy.get('p')
                                .eq(index * numberItemsInRow + 1)
                                .should('have.text', id.rek_grant_id);
                        });
                        record.fez_record_search_key_grant_agency_type.map((type, index) => {
                            cy.get('p')
                                .eq(index * numberItemsInRow + 2)
                                .should('have.text', type.rek_grant_agency_type_lookup);
                        });
                    });
            });
    });
});
