import formsLocale from '../../src/locale/forms';
// import pagesLocale from '../../src/locale/pages';
import fileUploaderLocale from '../../src/modules/SharedComponents/Toolbox/FileUploader/locale';

context('Claim possible work', () => {
    const baseUrl = Cypress.config('baseUrl');
    const claimFormLocale = formsLocale.forms.claimPublicationForm;
    // const possibleClaimsLocale = pagesLocale.pages.claimPublications;

    beforeEach(() => {
        cy.visit('/records/possible');
        cy.closeUnsupported();
    });

    afterEach(() => {
        cy.navToHomeFromMenu(claimFormLocale.cancelWorkflowConfirmation);
    });

    it('renders a list of possible works with filters', () => {
        cy.get('h2')
            .should('have.length', 1)
            // .should('contain', possibleClaimsLocale.title);
            .should('contain', 'Claim possible works');

        // This causes flake since the mock returns data too quickly.
        // Need to mock network layer in Cypress to resolve.

        // cy.get('h2 + div')
        //     .should('have.length', 1)
        //     .should('contain', 'Searching for possibly your works');

        cy.get('.StandardCard h6[class*="PublicationCitation-citationTitle"] > a')
            .should('have.length', 8);
        cy.get('[class*="MuiGrid-grid-sm-3"] h6')
            .should('have.length', 1)
            .should('contain', 'Refine results');
        cy.get('[class*="MuiGrid-grid-sm-3"] .facetsFilter [class*="MuiListItem-root-"]')
            .should('have.length', 6);
    });

    it('can navigate to a claim page with specific elements', () => {
        cy.get('.StandardCard button.publicationAction')
            .first()
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/claim`);
        cy.get('h2')
            .should('have.length', 1)
            .should('contain', claimFormLocale.title);
        cy.get('.StandardCard h3')
            .should('contain', claimFormLocale.claimingInformation.title)
            .should('contain', claimFormLocale.authorLinking.title)
            .should('contain', claimFormLocale.contributorLinking.title)
            .should('contain', claimFormLocale.contentIndicators.title)
            .should('contain', claimFormLocale.comments.title)
            .should('contain', claimFormLocale.fileUpload.title);
        cy.get('.Alert b')
            .scrollIntoView()
            .should('contain', claimFormLocale.validationAlert.title);
        cy.contains('button', claimFormLocale.cancel)
            .should('not.be.disabled');
        cy.contains('button', claimFormLocale.submit)
            .should('be.disabled');
    });

    it('can cancel a claim after filling the form', () => {
        cy.get('.StandardCard button.publicationAction')
            .first()
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/claim`);
        cy.contains('.StandardCard', claimFormLocale.comments.title)
            .find('textarea')
            .type('Test comment');
        cy.contains('button', claimFormLocale.cancel)
            .click();
        cy.contains('[role="document"]', claimFormLocale.cancelWorkflowConfirmation.confirmationTitle)
            .contains(claimFormLocale.cancelWorkflowConfirmation.confirmButtonLabel)
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/possible`);
    });

    it('allows selection of unselected content indicators, but does not allow deselection of existing', () => {
        cy.get('.StandardCard button.publicationAction')
            .first()
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/claim`);
        cy.contains(claimFormLocale.contentIndicators.title)
            .scrollIntoView();
        cy.get('#content-indicators')
            .click();
        // Click new item in multiselect modal
        cy.get('#menu-')
            .contains('Protocol')
            .click();
        // Click outside the multiselect
        cy.get('#menu-')
            .click(10, 10);
        cy.get('#content-indicators')
            .contains('Scholarship of Teaching and Learning, Protocol')
            .click();
        // Preselected item in multiselect modal should be unclickable
        cy.get('#menu-')
            .contains('li', 'Scholarship of Teaching and Learning')
            .should('have.css', 'pointer-events', 'none');
        // Click outside the multiselect
        cy.get('#menu-')
            .click(10, 10);
        // Selection has not changed
        cy.get('#content-indicators')
            .contains('Scholarship of Teaching and Learning, Protocol');
    });

    it('will detect and prevent submission of invalid URLs', () => {
        cy.get('.StandardCard button.publicationAction')
            .first()
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/claim`);
        // Make form valid otherwise
        cy.contains('.StandardCard', claimFormLocale.authorLinking.title)
            .find('button')
            .first()
            .click();
        cy.contains('I confirm and understand')
            .click();
        // Confirm form submission is enabled
        cy.contains('button', claimFormLocale.submit)
            .should('not.be.disabled');
        // Enter invalid data triggers validation errors
        cy.contains('.StandardCard', claimFormLocale.comments.title)
            .find('input')
            .type('invalid')
            .closest('.StandardCard')
            .contains('URL is not valid');
        // Confirm form submission is disabled until URL is fixed
        cy.contains('button', claimFormLocale.submit)
            .should('be.disabled');
        cy.contains('.StandardCard', claimFormLocale.comments.title)
            .find('input')
            .type('.com');
        cy.contains('button', claimFormLocale.submit)
            .should('be.disabled');
        cy.contains('.StandardCard', claimFormLocale.comments.title)
            .find('input')
            .type('{home}{del}{del}https://');
        cy.contains('button', claimFormLocale.submit)
            .should('not.be.disabled');
    });

    it('will allow upload of files', () => {
        cy.get('.StandardCard button.publicationAction')
            .first()
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/claim`);
        const fileName = 'test.jpg';
        cy.fixture(fileName)
            .then(fileContent => {
                cy.get('div#FileUploadDropZone')
                    .upload(
                        { fileContent, fileName, mimeType: 'image/jpg' },
                        { subjectType: 'drag-n-drop' },
                    );
            });
        cy.contains('.StandardCard', claimFormLocale.fileUpload.title)
            .should('contain', fileUploaderLocale.successMessage.replace('[numberOfFiles]', '1'))
            .contains(fileUploaderLocale.fileUploadRow.fileUploadRowAccessSelector.initialValue)
            .click();
        cy.contains('#menu-accessCondition li', 'Open Access')
            .click();
        cy.get('[class*="FileUploadTermsAndConditions-root"]')
            .click();
    });

    it('can choose author, then submit the claim.', () => {
        cy.get('.StandardCard button.publicationAction')
            .first()
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/claim`);
        cy.contains('.StandardCard', claimFormLocale.authorLinking.title)
            .find('button')
            .first()
            .click();
        cy.contains('I confirm and understand')
            .click();
        cy.contains('button', claimFormLocale.submit)
            .should('not.be.disabled')
            .click();
        cy.get('[class*="Alert-info"] .alert-text')
            .should('contain', claimFormLocale.progressAlert.title)
            .should('contain', claimFormLocale.progressAlert.message);
        cy.get('[class*="Alert-done"] .alert-text')
            .should('contain', claimFormLocale.successAlert.title)
            .should('contain', claimFormLocale.successAlert.message);
        cy.contains('h6', claimFormLocale.successWorkflowConfirmation.confirmationTitle)
            .should('have.length', 1);
        cy.contains('button', claimFormLocale.successWorkflowConfirmation.cancelButtonLabel)
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/possible`);
    });

    it('can choose editor, then submit the claim.', () => {
        cy.contains('.publicationCitation', 'Book with editors')
            .find('button.publicationAction')
            .first()
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/claim`);
        cy.contains('.StandardCard', claimFormLocale.contributorLinking.title)
            .find('button')
            .first()
            .click();
        cy.contains('I confirm and understand')
            .click();
        cy.contains('button', claimFormLocale.submit)
            .should('not.be.disabled')
            .click();
        cy.get('[class*="Alert-info"] .alert-text')
            .should('contain', claimFormLocale.progressAlert.title)
            .should('contain', claimFormLocale.progressAlert.message);
        cy.get('[class*="Alert-done"] .alert-text')
            .should('contain', claimFormLocale.successAlert.title)
            .should('contain', claimFormLocale.successAlert.message);
        cy.contains('h6', claimFormLocale.successWorkflowConfirmation.confirmationTitle)
            .should('have.length', 1);
        cy.contains('button', claimFormLocale.successWorkflowConfirmation.cancelButtonLabel)
            .click();
        cy.url()
            .should('equal', `${baseUrl}/records/possible`);
    });
});
