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
                    '?url=https%3A%2F%2Fpsv4.vkuseraudio.net%2Fc6114%2Fu82519292%2Faudios%2F0396ac48fe65.mp3',
                    'readonly=true',
                    'currentTime=0'
                ].join('&')
            );
        });

        cy.get('.url-form').should('not.be.visible');
    });
});
