/**
 * Simulates the retrieval of a list of activities for spicial equipmentType for testing purposes.
 *
 * @param {string} equipmentType - The type of equipment for which to retrieve activities.
 * @param {function} callback - The callback function to execute after retrieving the list of activities.
 */
function GetActivitiesList(equipmentType, callback) {
  setTimeout(function () {
    var reactorActivities = [
      {
        OperationType: "loading_of_solid",
        Content:
          "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Material is loaded into reactor {reactor} via 60 mm flange port using funnel {funnel}. The 60 mm flange port is closed.",
        DurationMIN: "",
        DurationMAX: "",
        TemperatureMIN: "",
        TemperatureMAX: "",
      },
      {
        OperationType: "loading_of_liquid",
        Content:
          "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Using peristaltic pump  {peristaltic pump} and norprene hose {norprene hose}, {material} is pumped into reactor via liquid loading valve. Peristaltic pump is set to {setting}%. After loading is done, pump is stopped, hose is removed. The 60 mm flange port is closed. Hose is cleaned.",
        DurationMIN: "",
        DurationMAX: "",
        TemperatureMIN: "",
        TemperatureMAX: "",
      },
      {
        OperationType: "dosing_of_liquid",
        Content:
          "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Using peristaltic pump  {peristaltic pump} and norprene hose {norprene hose}, {material} is pumped into dosing system. Peristaltic pump is set to {setting}%. After loading is done, pump is stopped, hose is removed. Dosing system is closed. Hose is cleaned.",
        DurationMIN: "",
        DurationMAX: "",
        TemperatureMIN: "",
        TemperatureMAX: "",
      },
      {
        OperationType: "creating_argon_flow",
        Content:
          "Argon line is connected to the argon port of reactor. The flow is set to {setting}l/min. The valve is opened. After required time is passed, the argon flow is closed.",
        DurationMIN: "",
        DurationMAX: "",
        TemperatureMIN: "",
        TemperatureMAX: "",
      },
      {
        OperationType: "stirring_on",
        Content: "Stirring in reactor is turned ON. Set to {setting}rpm.",
        DurationMIN: "",
        DurationMAX: "",
        TemperatureMIN: "",
        TemperatureMAX: "",
      },
      {
        OperationType: "stirring_off",
        Content: "Stirring in reactor is turned OFF.",
        DurationMIN: "",
        DurationMAX: "",
        TemperatureMIN: "",
        TemperatureMAX: "",
      },
      {
        OperationType: "heating_on",
        Content: "Heating is turned ON. Set to {setting}°C.",
        DurationMIN: "",
        DurationMAX: "",
        TemperatureMIN: "",
        TemperatureMAX: "",
      },
    ];
    // Call the callback function with the retrieved data
    callback(reactorActivities);
  }, 200);
}

/**
 * Simulates the retrieval of a list of equipment for special equipmentType for testing purposes.
 *
 * @param {string} equipmentType - The type of equipment to retrieve from the DataBase
 * @param {function} callback - The callback function to execute after retrieving the equipment list.
 */
function GetEquipmentListByType(equipmentType, callback) {
  setTimeout(function () {
    var equipmentList;
    switch (equipmentType) {
      case "balances":
        equipmentList = [
          { name: "balances", code: "007-10" },
          { name: "balances", code: "007-11" },
          { name: "balances", code: "007-12" },
        ];
        break;
      case "pump":
        equipmentList = [
          { name: "pump", code: "001-10" },
          { name: "pump", code: "001-11" },
          { name: "pump", code: "001-12" },
        ];
        break;
      case "reactor":
        equipmentList = [
          { name: "reactor", code: "002-10" },
          { name: "reactor", code: "002-11" },
          { name: "reactor", code: "002-12" },
          { name: "reactor", code: "002-13" },
        ];
        break;
      case "jug":
        equipmentList = [
          { name: "jug", code: "tile" },
          { name: "jug", code: "waste" },
        ];
        break;
      case "funnel": // Adding support for "funnel"
        equipmentList = [
          { name: "funnel", code: "funnel-1" },
          { name: "funnel", code: "funnel-2" },
          { name: "funnel", code: "funnel-3" },
        ];
        break;
      default:
        // Handle unknown equipmentType or other cases
        equipmentList = [];
    }
    // Call the callback function with the retrieved data
    callback(equipmentList);
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

//makes {} elements of text BOLD
function boldTextInBraces(text) {
  return text.replace(/\{([^}]+)\}/g, '<strong>{$1}</strong>');
}

/**
 * Replace {placeHolders} in description text to option select list.
 *
 * @param {string} text - The description for operation.
 */
function replaceTextWithSelect(text) {
  const regex = /\{([^}]+)\}/g;
  let equipmentTypes = [];
  let output = text;

  let promises = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    equipmentTypes.push(match[1]);
  }

  equipmentTypes.forEach((equipmentType) => {
    let promise = new Promise((resolve) => {
      GetEquipmentListByType(equipmentType, function (equipmentList) {
        // Add default "--select--" option
        const defaultOption = '<option value="">--select--</option>';
        const selectOptions = equipmentList
          .map(
            (equipment) =>
              `<option value="${equipment.code}">${equipment.code}</option>`
          )
          .join("");
        const selectList = `<select name="${equipmentType}">${defaultOption}${selectOptions}</select>`;
        output = output.replace(`{${equipmentType}}`, selectList);
        resolve();
      });
    });

    promises.push(promise);
  });

  return Promise.all(promises).then(() => {
    return output;
  });
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
