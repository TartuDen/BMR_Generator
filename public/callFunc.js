function GetReactorList(callback) {
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
