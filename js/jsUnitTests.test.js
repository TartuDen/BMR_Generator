const { getInnerHTMLForTypicalActivity } = require("./innerHTML.js");

describe("getInnerHTMLForTypicalActivity", () => {
  it("should replace placeholders with input fields for parameters", async () => {
    // Test case 1: Parameters without "Range"
    const activityContent1 = "This is a {param1} and {param2}.";
    const parametersForOperations1 = ["param1", "param2"];
    const modifiedText1 = await getInnerHTMLForTypicalActivity(
      activityContent1,
      parametersForOperations1
    );
    expect(modifiedText1).toContain('<input type="number" id="params_param1"');
    expect(modifiedText1).toContain('<input type="number" id="params_param2"');

    // Test case 2: Parameters with "Range"
    const activityContent2 = "This is a {param3Range} and {param4Range}.";
    const parametersForOperations2 = ["param3Range", "param4Range"];
    const modifiedText2 = await getInnerHTMLForTypicalActivity(
      activityContent2,
      parametersForOperations2
    );
    expect(modifiedText2).toContain(
      '<input type="number" id="params_param3_min"'
    );
    expect(modifiedText2).toContain(
      '<input type="number" id="params_param3_max"'
    );
    expect(modifiedText2).toContain(
      '<input type="number" id="params_param4_min"'
    );
    expect(modifiedText2).toContain(
      '<input type="number" id="params_param4_max"'
    );
  });

  it("should reject the promise if parameters do not correspond to class properties", async () => {
    const activityContent = "This is a {placeholder1} and {placeholder2}.";
    const parametersForOperations = ["invalidParam"];
    await expect(
      getInnerHTMLForTypicalActivity(activityContent, parametersForOperations)
    ).rejects.toThrow(Error);
  });
});
