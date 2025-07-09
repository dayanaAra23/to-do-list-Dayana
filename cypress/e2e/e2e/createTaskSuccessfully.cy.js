
// This test aims to test if a new task can be created successfully via UI
// Using cypress fixtures since i want to have the possibility to reuse date
// Overriding fixture values to use fake data creation

import { faker  } from "@faker-js/faker";

describe("Create new task successfully", () => {
  it("Create new task successfully via UI", () => {
    cy.fixture("taskCreation").then((taskCreation) => {
      taskCreation.taskName = faker.lorem.words(3),
      taskCreation.description = faker.lorem.sentence(20),
      taskCreation.completed = faker.datatype.boolean(),
      taskCreation.label = faker.helpers.arrayElement(["Personal", "Work", "Buy", "Study", "Seicho"]),

      cy.getPage();
      cy.createNewTask();
    });
  });
});
