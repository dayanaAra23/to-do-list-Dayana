const SELECTORS = {
    taskName: '[data-test-id="taskName"]',
    dueDate: '[data-test-id="dueDate"]',
    description: '[data-test-id="description"]',
    label: '[data-test-id="label"]',
    addNewTaskButton: '[data-test-id="addTask"]',
};


Cypress.Commands.add('getPage', () => {
    cy.intercept('/api/tasks').as('getTasks');
    cy.visit(Cypress.env('feUrl'));
    cy.wait('@getTasks');
    cy.get('[data-test-id="taskName"]', { timeout: 60000 }).should('be.visible');
});

Cypress.Commands.add('createNewTask', () => {
    cy.get(taskName).type('')
    cy.get(dueDate).type('')
    cy.get(description).type('')
    cy.get(label).type('')
    cy.click(addNewTaskButton)
    cy.contains('New task created! 🎉')
});