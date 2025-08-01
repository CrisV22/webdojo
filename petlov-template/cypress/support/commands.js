Cypress.Commands.add('fillDonationForm', (donationPoint) => {
    if (donationPoint.name) cy.get('input[name="name"]').type(donationPoint.name)
    if (donationPoint.email) cy.get('input[name="email"]').type(donationPoint.email)

    if (donationPoint.address.zipCode) {
        cy.get('input[name="cep"]').type(donationPoint.address.zipCode)
        cy.get('input[value="Buscar CEP"]').click()
    }

    if (donationPoint.address.number) cy.get('input[name="addressNumber"]').type(donationPoint.address.number.toString())
    if (donationPoint.address.details) cy.get('input[name="addressDetails"]').type(donationPoint.address.details)

    cy.get('.signup-pet li').first().click() // Seleciona Cachorros
    cy.get('.signup-pet li').last().click()  // Seleciona Gatos
})

Cypress.Commands.add('verifyDisabledFields', (address) => {
    cy.get('input[name="addressStreet"]').should('be.disabled').and('have.value', address.street)
    cy.get('input[name="addressDistrict"]').should('be.disabled').and('have.value', address.district)
    cy.get('input[name="addressCityUf"]').should('be.disabled').and('have.value', `${address.city}/${address.state}`)
})