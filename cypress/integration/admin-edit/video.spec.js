import { default as recordList } from '../../../src/mock/data/records/publicationTypeListVideo';

context('Video admin edit', () => {
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

                        // Video record includes the owner's Rights
                        cy.get('#Copyrightnotice')
                            .should('have.value', record.fez_record_search_key_rights.rek_rights);
                    });
            });
    });

    // it('should submit successfully', () => {
    //     const baseUrl = Cypress.config('baseUrl');
    //     cy.get('button')
    //         .contains('Submit')
    //         .click();
    //     cy.get('[role=dialog]')
    //         .should('exist')
    //         .find('h6')
    //         .should('contain', 'Work has been updated')
    //         .parent()
    //         .siblings('div')
    //         .contains('button', 'View updated record')
    //         .click();
    //     cy.url()
    //         .should('equal', `${baseUrl}/view/${record.rek_pid}`);
    // });
});
