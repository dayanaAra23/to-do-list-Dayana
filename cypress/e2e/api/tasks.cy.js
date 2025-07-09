
import { faker } from '@faker-js/faker';
// This test aims to test if a new task can be created successfully
// Using cypress fixtures since i want to have the possibility to reuse data
// Overriding fixture values to use fake data creation

describe("POST /tasks", () => {
  it("Create new task successfully", () => {
    cy.fixture("taskCreation").then((taskCreation) => {
        
      taskCreation.taskName = faker.lorem.words(3),
      taskCreation.description = faker.lorem.sentence(20),
      taskCreation.completed = faker.datatype.boolean(),
      taskCreation.label = faker.helpers.arrayElement(["Personal", "Work", "Buy", "Study", "Seicho"]),
      taskCreation.dueDate = faker.date.future().toISOString().split("T")[0]

      cy.request({
        method: "POST",
        url: `${Cypress.env('beUrl')}/tasks`,
        body: taskCreation,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("id");
        expect(response.body.taskName).to.eq(taskCreation.taskName);
        expect(response.body.completed).to.eq(taskCreation.completed);
      });
    });
  });
});