describe('Anon audio', () => {
    beforeEach(() => {
        cy.visit('https://localhost:8080/');
    });

    it('shows .url-form', () => {
        cy.get('.url-form').should('be.visible');
    });

    it('saves url', () => {
        cy.get('.url-form .url-input').type(
            'https://psv4.vkuseraudio.net/c6114/u82519292/audios/0396ac48fe65.mp3'
        );
        cy.get('.url-form .btn-save').click();

        cy.location().should(location => {
            expect(location.search).to.eq(
                [
                    '?url=aHR0cHM6Ly9wc3Y0LnZrdXNlcmF1ZGlvLm5ldC9jNjExNC91ODI1MTkyOTIvYXVkaW9zLzAzOTZhYzQ4ZmU2NS5tcDM%3D',
                    'readonly=true',
                    'currentTime=0'
                ].join('&')
            );
        });

        cy.get('.url-form').should('not.be.visible');
    });
});
