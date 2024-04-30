describe('Admin register hotelAdmin', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginBtn').click()
    cy.get('input[id="input-email-for-credentials-provider"]').type('admin1@gmail.com');
    cy.get('input[id="input-password-for-credentials-provider"]').type('admin123');
    cy.contains('button', 'Sign in with Credentials').click()
  })

  it('[US1-4] admin should register hotelAdmin', () => { // pls remove hotelAdminTest2 if it exists
    cy.contains('a', 'Profile').click()
    cy.contains('button', 'Add Hotel Admin').click()
    cy.get('input[id="name"]').type('hotelAdminTest2')
    cy.get('input[id="tel"]').type('0812310000')
    cy.get('input[id="email"]').type('hotelAdminTest2@gmail.com')
    cy.get('input[id="password"]').type('admin123')
    cy.get('input[id="confirmPassword"]').type('admin123')
    cy.get('select').select('6621da4c33aa02a4ec39b89a')
    cy.contains('button', 'Register').click()
    cy.get('.Toastify__toast--success').should('be.visible')
  })
})

describe('Hotel Admin Interact', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginBtn').click()
    cy.get('input[id="input-email-for-credentials-provider"]').type('hotelAdminTest@gmail.com');
    cy.get('input[id="input-password-for-credentials-provider"]').type('admin123');
    cy.contains('button', 'Sign in with Credentials').click()
  })

  describe('[US1-1] HotelAdmin see, edit and delete booking in their hotel', () => {
    beforeEach(() => {
      cy.contains('a', 'myBooking').click()
    })
    
    it('hotelAdmin should able to see booking', () => {
      cy.get('div.pt-1').children().should('have.length.gt', 1)
    })

    it('hotelAdmin should able to edit booking', () => {
      cy.get('button').contains('Edit').click()
      cy.get('input[name="bookingDate"]').parent().type('05/05/2024{enter}')
      cy.get('input[name="checkoutDate"]').parent().type('05/08/2024{enter}')
      cy.get('button').contains('Confirm').click()
      cy.get('.Toastify__toast--success').should('be.visible')
    })

    it('hotelAdmin should able to delete booking', () => {
      cy.get('button').contains('Remove from Booking List').click()
      cy.get('.Toastify__toast--success').should('be.visible')
    })
  })
  

  describe('[US1-2] HotelAdmin see, edit and delete room in their hotel', () => {
    beforeEach(() => {
      cy.contains('div', 'BeerTinder').click()
    })

    it('hotelAdmin should able to add room', () => {
      cy.get('button').contains('Add Room').should('be.visible').click()
      cy.get('input[name="roomNo"]').type('110')
      cy.get('select').select('Luxury')
      cy.get('input[name="price"]').type('6000')
      cy.get('button').contains('ADD ROOM').click()
      cy.get('.Toastify__toast--success').should('be.visible')
    })

    it('hotelAdmin should able to edit room', () => {
      cy.get('#edit110').click()
      cy.get('input[name="roomNo"]').parent().clear().type('111')
      cy.get('input[name="price"]').parent().clear().type('7000')
      cy.get('button').contains('Update Room').click()
      cy.get('.Toastify__toast--success').should('be.visible')
    })

    it('hotelAdmin should able to delete room', () => {
      cy.get('#delete111').click()
      cy.get('.Toastify__toast--success').should('be.visible')
    })
  })
})

describe('[US1-3] User see Notification', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginBtn').click()
    cy.get('input[id="input-email-for-credentials-provider"]').type('user1@gmail.com')
    cy.get('input[id="input-password-for-credentials-provider"]').type('user123')
    cy.contains('button', 'Sign in with Credentials').click()
  })

  it('should see notification', () => {
    cy.get('a[href="notificationPage"]').click()
    cy.get('div.pt-1').children().should('have.length.gt', 1)
  })
})