const validators = require("../../validators/task-payload");

test("Task payload validator works as expected", () => {
  const samplePayload = { id: "test", result: 123 };
  const { error, value } = validators.taskPayload.validate(samplePayload);

  expect(error).toBe(undefined);
});
