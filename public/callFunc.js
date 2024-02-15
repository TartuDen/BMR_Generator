/**
 * Simulates the retrieval of a list of activities for spicial equipmentType for testing purposes.
 *
 * @param {string} equipmentType - The type of equipment for which to retrieve activities.
 * @param {function} callback - The callback function to execute after retrieving the list of activities.
 */
function GetLoadingOfSolidActivitiesList(equipmentType, callback) {
  setTimeout(function () {
    var loadingOfSolidActivities = [
      {
        OperationType: "loading_of_solid",
        Content:
          "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Material is loaded into reactor " +
          equipmentType +
          " via 60 mm flange port using funnel {funnel}. The 60 mm flange port is closed.",
        DurationMIN: "0.5h",
        DurationMAX: "1.0h",
        TemperatureMIN: "10°C",
        TemperatureMAX: "20°C",
      },
      // Add more loading_of_solid activities as needed
    ];
    // Call the callback function with the retrieved data
    callback(loadingOfSolidActivities);
  }, 200);
}

/**
 * Simulates the retrieval of a list of equipment for spicial equipmentType for testing purposes.
 *
 * @param {string} equipmentType - The type of equipment to retrieve form the DataBase
 * @param {function} callback - The callback function to execute after retrieving the equipment list.
 */
function GetEquipmentList(equipmentType, callback) {
  setTimeout(function () {
    var reactorList = [
      { name: "reactor", code: "002-10" },
      { name: "reactor", code: "002-11" },
      { name: "reactor", code: "002-12" },
      { name: "reactor", code: "002-13" },
      { name: "reactor", code: "002-14" },
      { name: "reactor", code: "002-15" },
      { name: "reactor", code: "002-16" },
    ];
    // Call the callback function with the retrieved data
    callback(reactorList);
  }, 200);
}

/**
 * Simulates the retrieval of a list of equipment types for testing purposes.
 * 
 * @param {function} callback - The callback function to execute after retrieving the list of equipment types.
 */
function GetEquipmentType(callback) {
  var equipmentTypes = [
    {
      name: "reactor",
    },
    {
      name: "oven",
    },
    {
      name: "balances",
    },
  ];
  callback(equipmentTypes);
}









// Function to fetch data for the selected item
function fetchSelectedItemData(selectElement) {
  // Get the selected value from the dropdown
  var selectedValue = selectElement.value;

  // Make sure a value is selected
  if (selectedValue) {
    // Make a GET request to fetch data for the selected item
    axios
      .get("https://www.boredapi.com/api/activity/")
      .then(function (response) {
        // Extract data for the selected item from the response
        var selectedItemData = response.data;

        // Do something with the selected item's data, e.g., save it
        console.log(selectedItemData);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  } else {
    // Handle case where no value is selected (optional)
    console.log("No item selected");
  }
}
