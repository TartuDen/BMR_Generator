// apiMocks.js

/**
 * Mock function to simulate fetching an authorization token.
 * This function returns a hardcoded token.
 * 
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @returns {Promise<string>} A Promise that resolves with the mock authorization token.
 */
async function GetAuthTokenMOCK(username, password) {
    const tokenExpirationTime = 3600 * 1000; // Token expiration time in milliseconds (e.g., 1 hour)
    
    // Check if token exists in the session and is not expired
    const storedToken = sessionStorage.getItem('authToken');
    const storedTokenTimestamp = sessionStorage.getItem('authTokenTimestamp');
    const currentTime = new Date().getTime();

    if (storedToken && storedTokenTimestamp && (currentTime - storedTokenTimestamp < tokenExpirationTime)) {
        // Token exists and is not expired, return it
        return Promise.resolve(storedToken);
    } else {
        // Generate a new token (mocked)
        const mockToken = 'mockAuthToken123';
        
        // Store the new token and timestamp in the session
        sessionStorage.setItem('authToken', mockToken);
        sessionStorage.setItem('authTokenTimestamp', currentTime.toString());
        
        return Promise.resolve(mockToken);
    }
}

/**
 * Simulates retrieving a list of parameters for operations with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of parameters for operations.
 */
async function GetParametersForOperationsMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of parameters for operations
  const parameters = ["time", "temp", "rpm", "flow", "ppumpSet","torr"];

  return parameters;
}

/**
 * Simulates retrieving a list of equipment types with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment types.
 */
async function GetListEquipmentTypesMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  const equipmentTypes = [
    { name: "reactor" },
    { name: "oven" },
    { name: "balances" },
    { name: "druck_filter" },
    { name: "nutsche_filter" },
    { name: "membrane_pump" },
    { name: "peristaltic_pump" },
  ];

  return equipmentTypes;
}

/**
 * Simulates retrieving a list of activities for Reactor equipment - equipmentType with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of activities.
 */
async function GetListReactorActivityMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  var activities = [
    {
      Equipment: "reactor",
      OperationType: "loading_of_solid",
      Content:
        "Required amount of {material} is weighed on the balances {balances} using jug {jug}, weighted material is loaded into reactor {reactor} via 60 mm flange port using funnel {funnel}. The 60 mm flange port is closed.",
    },
    {
      Equipment: "reactor",
      OperationType: "loading_of_liquid",
      Content:
        "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Using peristaltic pump  {peristaltic_pump} and norprene hose {norprene hose}, weighted material is pumped into reactor via liquid loading valve. Peristaltic pump is set to {ppumpSet}%. After loading is done, pump is stopped, hose is removed. The 60 mm flange port is closed. Hose is cleaned.",
    },
    {
      Equipment: "reactor",
      OperationType: "dosing_of_liquid",
      Content:
        "Required amount of {material} is weighed on the balances {balances} using jug {jug}. Using peristaltic pump  {peristaltic_pump} and norprene hose {norprene hose}, weighted material is pumped into dosing system. Peristaltic pump is set to {ppumpSet}%. After loading is done, pump is stopped, hose is removed. Dosing system is closed. Hose is cleaned.",
    },
    {
      Equipment: "reactor",
      OperationType: "creating_argon_flow",
      Content:
        "Argon line is connected to the argon port of reactor {reactor}. The Argon {material} flow is set to {flow}l/min. The valve is opened. After required time is passed, the argon flow is closed.",
    },
    {
      Equipment: "reactor",
      OperationType: "stirring_on",
      Content: "Stirring in reactor {reactor} is turned ON. Set to {rpm} rpm.",
    },
    {
      Equipment: "reactor",
      OperationType: "stirring_off",
      Content: "Stirring in reactor {reactor} is turned OFF.",
    },
    {
      Equipment: "reactor",
      OperationType: "heating_on",
      Content:
        "Heating for reactor {reactor} is turned ON. Temperature is set to {temp}°C.",
    },
    {
      Equipment: "druck_filter",
      OperationType: "preparation of filter",
      Content:
        "The filter {druck_filter} is assembled and prepared to work. Filtration cloth {filtration cloth} is prepared and properly installed. Argon and product lines are connected to the lid, pressure test is done.",
    },
    {
      Equipment: "druck_filter",
      OperationType: "loading on filter",
      Content:
        "Product is loaded on the filter {druck_filter} via product line. Argon line is closed during loading. Once 2/3 of the filter is loaded, stop pumping and close product line.",
    },
    {
      Equipment: "druck_filter",
      OperationType: "filtration with argon pressure",
      Content:
        "Check that product line is closed, check the pressure on Argon cylinder {Argon cylinder}, it must be in range 1-2bar. Open argon line on the lid of the filter {druck_filter} and wait until no more or very little of ML is coming into the receiver (visually on level tube). At the end of operation close the argon line.",
    },
    {
      Equipment: "druck_filter",
      OperationType: "discharging ML",
      Content:
        "Check that product line and argon line are closed. Release top valve on the receiver to make sure there is no extra pressure. Connect peristaltic pump {peristaltic_pump} to the bottom valve of the filter {druck_filter} using norprene hose {norprene hose}. Second end of the hose is securely fixed into receiving container canister, set the speed of peristaltic pump {peristaltic_pump} %. Start the pump. Continue the process until all ML is unloaded into respective receiver.",
    },
    {
      Equipment: "druck_filter",
      OperationType: "washing FK",
      Content:
        "The lid of filter {druck_filter} is opened. Required amount of material is weighed on the balances {balances} using jug. Solvent is loaded on top of filter caje, using shovel {shovel} the filter cake is thoroughly mixed. The lid is closed.",
    },
    {
      Equipment: "druck_filter",
      OperationType: "drying on filter",
      Content:
        "The filter cake is additionally dried on the filter {druck_filter} using argon flow - Argon cylinder {Argon cylinder}. Argon is set to {flow} l/min, check that outlet valve is opened and the stream is led to the ventilation. Argon line is opened. Drying on filter is continued for min. After required time is passed, the argon line is closed.",
    },
    {
      Equipment: "druck_filter",
      OperationType: "unloading from filter",
      Content:
        "The lid of the filter {druck_filter} is opened. Material from the filter is unloaded using shovel {shovel} <to where>.",
    },
    {
      Equipment: "nutsche_filter",
      OperationType: "preparation of filter",
      Content:
        "The filter {nutsche_filter} is assembled and prepared to work. Filtration cloth is prepared and properly installed. Membrane pump {membrane_pump} is connected.",
    },
    {
      Equipment: "nutsche_filter",
      OperationType: "vacuum setting",
      Content: "Membrane pump {membrane_pump} is set {torr} Torr.",
    },
    {
      Equipment: "nutsche_filter",
      OperationType: "loading on filter",
      Content:
        "Membrane pump {membrane_pump} is started. Product is loaded on the filter {nutsche_filter} using jug. Once 2/3 of the filter is loaded, stop loading.",
    },
    {
      Equipment: "nutsche_filter",
      OperationType: "discharging ML",
      Content:
        "Stop the pump. Connect peristaltic pump {peristaltic_pump} to the bottom valve of the filter using norprene hose {norprene hose}. Second end of the hose is securely fixed into receiving container canister, set the speed of peristaltic pump {peristaltic_pump} %. Start the pump. Continue the process until all ML is unloaded into respective receiver.",
    },
    {
      Equipment: "nutsche_filter",
      OperationType: "washing FK",
      Content:
        "Make sure the pump is stopped. Required amount of material is weighed on the balances {balances} using jug. Solvent {material} is loaded on top of filter cake, using shovel {shovel} the filter cake is thoroughly mixed.",
    },
    {
      Equipment: "nutsche_filter",
      OperationType: "drying on filter",
      Content:
        "The filter cake is additionally dried on the filter by keeping membrane pump sucking air through it. Membrane pump {membrane_pump} is set to {torr} Torr. Drying on filter is continued for {time} min. After required time is passed, the pump is stopped.",
    },
    {
      Equipment: "nutsche_filter",
      OperationType: "unloading from filter",
      Content:
        "The lid of the filter {nutsche_filter} is opened. Material from the filter is unloaded using shovel {shovel} <to where>.",
    },
    {
      Equipment: "membrane_pump",
      OperationType: "vacuum setting",
      Content: "Membrane pump {membrane_pump} is set to {torr} Torrs.",
    },
    {
      Equipment: "peristaltic_pump",
      OperationType: "speed setting",
      Content: "Peristaltic pump {peristaltic_pump} is set to {ppumpSet} %.",
    },
  ];
    

  // Filter activities based on the equipment type
  if (equipmentType) {
    activities = activities.filter(activity => activity.Equipment === equipmentType);
  }
  return activities;
}


/**
 * Simulates retrieving a list of equipment for a special equipment type with a delay.
 *
 * @param {string} equipmentType - The type of equipment to retrieve from the DataBase
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment for the specified type.
 */
async function GetEquipmentListByTypeMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment for different types
  const equipmentMap = {
    balances: [
      { name: "balances", code: "007-10" },
      { name: "balances", code: "007-11" },
      { name: "balances", code: "007-12" },
    ],
    pump: [
      { name: "pump", code: "001-10" },
      { name: "pump", code: "001-11" },
      { name: "pump", code: "001-12" },
    ],
    reactor: [
      { name: "reactor", code: "002-10" },
      { name: "reactor", code: "002-11" },
      { name: "reactor", code: "002-12" },
      { name: "reactor", code: "002-13" },
    ],
    jug: [
      { name: "jug", code: "tile" },
      { name: "jug", code: "waste" },
    ],
    funnel: [
      { name: "funnel", code: "funnel-1" },
      { name: "funnel", code: "funnel-2" },
      { name: "funnel", code: "funnel-3" },
    ],
    druck_filter: [
      { name: "druck_filter", code: "046-6" },
    ],
    nutsche_filter: [
      { name: "nutsche_filter", code: "046-5" },
    ],
    membrane_pump: [
      { name: "membrane_pump", code: "001-22" },
      { name: "membrane_pump", code: "001-23" },
      { name: "membrane_pump", code: "001-24" },
    ],
    peristaltic_pump: [
      { name: "peristaltic_pump", code: "001-13" },
      { name: "peristaltic_pump", code: "001-21" },
      { name: "peristaltic_pump", code: "001-29" },
    ],
    // Add more equipment types as needed
  };

  // Return the simulated equipment list for the specified type
  return equipmentMap[equipmentType] || [];
}

/**
 * Simulates retrieving a list of all equipment with a delay.
 * @returns {Promise<Array>} A promise that resolves with the simulated list of all equipment.
 */
async function GetEquipmentListMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of all equipment
  const equipmentList = [
    { name: "balances", code: "007-10" },
    { name: "balances", code: "007-11" },
    { name: "balances", code: "007-12" },
    { name: "pump", code: "001-10" },
    { name: "pump", code: "001-11" },
    { name: "pump", code: "001-12" },
    { name: "reactor", code: "002-10" },
    { name: "reactor", code: "002-11" },
    { name: "reactor", code: "002-12" },
    { name: "reactor", code: "002-13" },
    { name: "jug", code: "tile" },
    { name: "jug", code: "waste" },
    { name: "funnel", code: "funnel-1" },
    { name: "funnel", code: "funnel-2" },
    { name: "funnel", code: "funnel-3" },
    { name: "druck_filter", code: "046-6" },
    { name: "nutsche_filter", code: "046-5" },
    { name: "membrane_pump", code: "001-22" },
    { name: "membrane_pump", code: "001-23" },
    { name: "membrane_pump", code: "001-24" },
    { name: "peristaltic_pump", code: "001-13" },
    { name: "peristaltic_pump", code: "001-21" },
    { name: "peristaltic_pump", code: "001-29" },
    // Add more equipment as needed
  ];

  return equipmentList;
}
