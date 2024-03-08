describe('sprint-6/step-1', () => {

  it('make order', () => {

    // открыть сайт
    cy.visit('http://localhost:3000')

    // нажать на плитку с ингредиент-булкой (появится модалка)
    cy.get('.cyIngredientTile').first().click()

    // нажать на кнопку [ Добавить в заказ ]
    cy.get('#modal button').should('contain', 'Добавить в заказ').click()
    
    // перетянуть ингредиент-начинку в бургер-конструктор
    cy.get('.cyIngredientTile').eq(2).trigger('dragstart');
    cy.get('.main > div:last-child').trigger('drop');

    // нажать на кнопку [ Оформить заказ ]
    cy.get('main > div:last-child button').should('contain', 'Оформить заказ').click()
    
    // авторизация
    cy.get('input[name="email"]').type('pavel@karasev.ru')
    cy.get('input[name="password"]').type('123123')
    cy.get('button').should('contain', 'Войти').click()
    
    // нажать на кнопку [ Оформить заказ ]
    cy.get('main > div:last-child button').should('contain', 'Оформить заказ').click()

    // подождать 4 секунды
    cy.wait(4000)

    // закрыть модалку
    cy.get('.cyModalClose').click()

  })

  

})