// apiMocks.js
// Define the delay function

/**
 * Delays execution for a specified duration.
 * @param {number} duration - The duration to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
function delay(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

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
    { name: "d_filter" },
    { name: "n_filter" },
    { name: "m_pump" },
    { name: "p_pump" },
  ];

  return equipmentTypes;
}

/**
 * Simulates retrieving a list of activities for Reactor equipment - equipmentType with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of activities.
 */
async function GetListActivityMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  var activities = [
    {
      Equipment: "reactor",
      OperationType: "prepare_of_reactor",
      Content:
      `The reactor {reactor} and thermostat are checked to be ready for work. A stirrer drive is installed.
On lid (clockwise):
1. Reflux condenser on ball ground joint
2. 60 mm flange port (with lid)
3. Valve (for loading liquid).
4. Overpressure release valve
5. Liquid dosage system
6. Thermometer
7. Valve with PTFE tubing for sparging of argon, closed, connected to argon cylinder with reducing valve;
The cold trap is connected behind the reactor.`,
      Other:
      ``
    },
    {
      Equipment: "reactor",
      OperationType: "material_load_of_solid",
      Content:
      `Required amount of {material} is weighed on the balances {balances} into jug "{jug}" using a plastic scoop. 
Weighted material is loaded into reactor {reactor} in portions via a 60 mm flange port using funnel "{funnel}". 
The 60 mm flange port is closed.

Specified amount: ….. kg (….. - ….. kg)`,
      Other:
`Warehouse code:
...........
Actual loading:
....... kg`
    },
    {
      Equipment: "reactor",
      OperationType: "material_load_of_liquid",
      Content:
      `Required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the reactor via a liquid loading valve. 
The peristaltic pump is set to {ppumpSet}%. 
After loading is done, the pump is stopped, and the hose is removed. The 60 mm flange port is closed. The hose is cleaned and dried.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg
Actual pump
setting: ..... %`  
    },
    {
      Equipment: "reactor",
      OperationType: "material_load_dropping_funnel",
      Content:
        `The required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the dosing system. 
The peristaltic pump is set to {ppumpSet}%. After loading is done, the pump is stopped, hose is removed. 
The dosing system is closed. The hose is cleaned and dried.

Specified amount: ….. kg (….. - ….. kg)`,
Other:
`Warehouse code:
...........
Actual loading:
....... kg
Actual pump
setting: ..... %`
    },
    {
      Equipment: "reactor",
      OperationType: "argon_start_flow",
      Content:
      `Argon line is connected to the argon port of reactor {reactor}. 
The Argon flow is set to {flow}l/min. The valve is opened.`,
    Other:
`Actual flow
setting: .... l/min`  
    },
    {
      Equipment: "reactor",
      OperationType: "argon_stop_flow",
      Content:
      `After the required time is passed, the argon flow is closed.`,
    Other:
`Actual flow
setting: .... l/min`  
    },       
    {
      Equipment: "reactor",
      OperationType: "reaction_hold_time",
      Content:
        `Reaction mixture is stirred during {time}. 
Temperature set is {temp}°C. Stirring is set to {rpm} rpm.`,
Other:
`Actual temp
setting: ..... °C
Actual stirring
setting: .... rpm`
    },
    {
      Equipment: "reactor",
      OperationType: "reaction_stir_ON",
      Content: "Stirring in reactor {reactor} is turned ON. Set to {rpm} rpm.",
      Other:
`Actual stirring
setting: .... rpm`
    },
    {
      Equipment: "reactor",
      OperationType: "reaction_stir_OFF",
      Content: "Stirring in reactor {reactor} is turned OFF.",
      Other:
      ``
    },
    {
      Equipment: "reactor",
      OperationType: "reaction_heat/cool_ON",
      Content:
      `<Heating/cooling> of reactor {reactor} is turned ON. Temperature is set to {temp}°C. 
The target temperature range is {temp}°C. Once the temperature is in a given range, the setting is changed to {temp}°C.`,
Other:
`Actual temp
setting: ..... °C`
    },
    {
      Equipment: "reactor",
      OperationType: "vac_dist.",
      Content:
      `Solvent is distilled out from reactor.
Tap water for condenser is turned ON.
Heating is set {temp}°C.
Stirring is set {rpm} rpm.
Membrane pump is connected via cold trap and turned ON.
Vacuum is gradually decreased {torr} torr.
Distillation is continued until <conditions>.`,
Other:
`Actual temp
setting: ..... °C
Actual stirring
setting: ..... rpm
Actual vacuum
setting: ..... Torr`
    },
    {
      Equipment: "reactor",
      OperationType: "reaction_cool_ON",
      Content:
      `Cooling of reactor {reactor} is turned ON. Temperature is set to {temp}°C. 
The target temperature range is {temp}°C. Once the temperature is in a given range, the setting is changed to {temp}°C.`,
Other:
`Actual temp
setting: ..... °C`
    },
    {
      Equipment: "reactor",
      OperationType: "material_unload",
      Content:
      `<Solution/suspension> from reactor is pumped using peristaltic pump {p_pump} and norprene hose "{hose}".
One end of the hose is connected to the bottom valve of reactor {reactor}.
Second end passed through the peristaltic pump and into <to where?>.`,
Other:``
    },

    {
      Equipment: "d_filter",
      OperationType: "prepare_filter",
      Content:
      `The filter {d_filter} is assembled and prepared to work. 
The filtration cloth is prepared and properly installed. 
Argon and product lines are connected to the lid, pressure test is done.`,
    Other:
    ``
    },
    {
      Equipment: "d_filter",
      OperationType: "load_on_filter",
      Content:
      `Product is loaded on the filter {d_filter} via product line. The Argon line is closed during loading. 
Once 2/3 of the filter is loaded, stop pumping and close the product line.`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `filtration_with_argon`,
      Content:
      `Check that the product line is closed, and check the pressure on Argon cylinder, it must be in the range 0.5-1bar. 
Open the argon line on the lid of the filter {d_filter} and wait until no more or very little of ML is coming into the receiver (visually on the level tube). 
At the end of operation close the argon line.`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `discharg_ML`,
      Content:
      `Check that the product line and argon line are closed. 
Release the top valve on the receiver to make sure there is no extra pressure. 
Connect peristaltic pump {p_pump} to the bottom valve of the filter {d_filter} using norprene hose "{hose}". 
The second end of the hose is securely fixed into the receiving container canister, set the speed of the peristaltic pump {ppumpSet} %. 
Start the pump. Continue the process until all ML is unloaded into the receiver.`,
     Other:
      ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `wash_FK`,
      Content:
      `The lid of filter {d_filter} is opened. 
The required amount of material is weighed on the balances {balances} using a jug "{jug}". 
The solvent is loaded on top of the filter cake, using shovel "{shovel}" the filter cake is thoroughly mixed. The lid is closed.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`,
     Other:
      ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `dry_on_filter`,
      Content:
      `The filter cake is additionally dried on the filter {d_filter} using argon flow - Argon cylinder. 
Argon is set to {flow} l/min, check that the outlet valve is opened and the stream is led to the ventilation. Argon line is opened. 
Drying on the filter is continued for min. After the required time is passed, the argon line is closed.`,
Other:
`Actual flow
setting: .... l/min` 
    },

    {
      Equipment: `d_filter`,
      OperationType: `unload_from_filter`,
      Content:
        `The lid of the filter {d_filter} is opened. Material from the filter is unloaded using shovel "{shovel}" <to where>.

Specified amount: ….. kg (….. - ….. kg)`,
        Other:
`Warehouse code:
...........
Actual loading:
....... kg`  
    },
    {
      Equipment: `n_filter`,
      OperationType: `prepare_filter`,
      Content:
      `The filter {n_filter} is assembled and prepared to work. 
The filtration cloth is prepared and properly installed. 
Membrane pump {m_pump} is connected.`,
    Other:
      ``
    },

    {
      Equipment: `n_filter`,
      OperationType: `load_on_filter`,
      Content:
      `Membrane pump {m_pump} is started. 
The product is loaded on the filter {n_filter} using jug "{jug}". 
Once 2/3 of the filter is loaded, stop loading.`,
Other:
      ``
    },
    {
      Equipment: `n_filter`,
      OperationType: `discharg_ML`,
      Content:
      `Stop the pump. Connect peristaltic pump {p_pump} to the bottom valve of the filter using norprene hose "{hose}". 
The second end of the hose is securely fixed into the receiving container canister, set the speed of the peristaltic pump {p_pump} %. 
Start the pump. 
Continue the process until all ML is unloaded into the respective receiver.`,
    Other:
      ``
    },
    {
      Equipment: `n_filter`,
      OperationType: `wash_FK`,
      Content:
      `Make sure the pump is stopped. The required amount of material is weighed on the balances {balances} using a jug "{jug}". 
Solvent {material} is loaded on top of filter cake, using shovel "{shovel}" the filter cake is thoroughly mixed.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`  
    },
    {
      Equipment: `n_filter`,
      OperationType: `dry_on_filter`,
      Content:
      `The filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it. 
Membrane pump {m_pump} is set to {torr} Torr. Drying on the filter is continued for {time} min. 
After the required time is passed, the pump is stopped.`,
Other:
`Actual plump
setting: ..... Torr`
    },
    {
      Equipment: `n_filter`,
      OperationType: `unload_from_filter`,
      Content:
        `The lid of the filter {n_filter} is opened. 
Material from the filter is unloaded using shovel "{shovel}" <to where>.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`  
    },
    {
      Equipment: `m_pump`,
      OperationType: `vacuum_pump_ON`,
      Content: `Membrane pump {m_pump} is set to {torr} Torrs.
Pump is turned ON.`,
      Other:
`Actual pump
setting: ..... Torr`
    },
    {
      Equipment: `m_pump`,
      OperationType: `vacuum_pump_OFF`,
      Content: `Pump is turned OFF.`,
      Other:``
    },
    {
      Equipment: `p_pump`,
      OperationType: `pump_ON`,
      Content: `Peristaltic pump {p_pump} is set to {ppumpSet} %.
Pump is turned ON`,
          Other:
      ``
    },
    {
      Equipment: `oven`,
      OperationType: `material_load_on_trays`,
      Content: `Using shovel "{shovel}" product is loaded on trays.
Each tray is weighed on balances {balances}, data is recorded into Table <number>.
Tray is placed into drying oven.
After all product is loaded on trays and placed into oven, the oven is clodes.
Heating is set {temp}.
Timer is set to {time}.
The dryining starts.`,
          Other:
      ``
    },
    {
      Equipment: `oven`,
      OperationType: `material_unload_from_trays`,
      Content: `Oven is truned OFF.
Oven is opened.
Each tray is taken from the oven and weighed on the balances {balances}.
Mass is recorded into BR table <number>.
Using shovel "{shovel}" product is unloaded from each tray into PE bag.
`,
          Other:``
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
      { name: "balances", code: "007-1", description: "max=3kg" },
      { name: "balances", code: "007-10", description: "max=2kg"},
      { name: "balances", code: "007-12", description: "max=1kg" },
      { name: "balances", code: "007-16", description: "max=220kg" },
      { name: "balances", code: "007-21", description: "max=1.3kg" },
      { name: "balances", code: "007-25", description: "max=3.5kg" },
      { name: "balances", code: "007-26", description: "max=3.5kg" },
      { name: "balances", code: "007-27", description: "max=3.5kg" },
      { name: "balances", code: "007-34", description: "max=3.5kg" },
      { name: "balances", code: "007-6", description: "max=10kg" },
      { name: "balances", code: "007-20", description: "max=3kg" },
      { name: "balances", code: "007-23", description: "max=150kg" },
      { name: "balances", code: "007-24", description: "max=30kg" },
      { name: "balances", code: "007-39", description: "max=30kg" },
      { name: "balances", code: "007-40", description: "max=30kg" },
      { name: "balances", code: "007-41", description: "max=3kg" },
      { name: "balances", code: "007-42", description: "max=30kg" },
      { name: "balances", code: "007-43", description: "max=1kg" },
      { name: "balances", code: "007-44", description: "max=120kg" },
      { name: "balances", code: "007-45", description: "max=60kg" },
    ],
    reactor: [
      { name: "reactor", code: "002-10", description:"30L glass" },
      { name: "reactor", code: "002-11", description:"15L glass" },
      { name: "reactor", code: "002-12", description:"150L glass" },
      { name: "reactor", code: "002-13", description:"100L glass" },
      { name: "reactor", code: "002-14", description:"100L g-lined" },
      { name: "reactor", code: "002-15", description:"150L glass" },
      { name: "reactor", code: "002-16", description:"50L glass" },
      { name: "reactor", code: "002-17", description:"100L glass" },
    ],
    d_filter: [
      { name: "d_filter", code: "046-4", description:"ss 40/80L" },
      { name: "d_filter", code: "046-6", description:"ss 30/45L" },
      { name: "d_filter", code: "046-7", description:"ss agit 100/140L" },
    ],
    n_filter: [
      { name: "n_filter", code: "046-1", description:"" },
      { name: "n_filter", code: "046-13", description:"" },
      { name: "n_filter", code: "046-14", description:"" },
      { name: "n_filter", code: "046-2", description:"" },
      { name: "n_filter", code: "046-3", description:"" },
    ],
    m_pump: [
      { name: "m_pump", code: "001-22", description:"" },
      { name: "m_pump", code: "001-23", description:"" },
      { name: "m_pump", code: "001-24", description:"" },
    ],
    p_pump: [
      { name: "p_pump", code: "001-13", description:"" },
      { name: "p_pump", code: "001-21", description:"" },
      { name: "p_pump", code: "001-29", description:"" },
    ],    
    o_pump: [
      { name: "o_pump", code: "001-38", description:"" },
      { name: "o_pump", code: "001-43", description:"" },
    ],
    oven: [
      { name: "oven", code: "012-10", description:"vac." },
      { name: "oven", code: "012-13", description:"conv." },
      { name: "oven", code: "012-14", description:"conv." },
      { name: "oven", code: "012-15", description:"vac." },
      { name: "oven", code: "012-16", description:"conv." },
      { name: "oven", code: "012-17", description:"vac." },
      { name: "oven", code: "012-6", description:"conv." },
      { name: "oven", code: "012-9", description:"vac." },
    ],
    // Add more equipment types as needed
  };

  // Return the simulated equipment list for the specified type
  return equipmentMap[equipmentType] || [];
}


// Export all functions together
export {
  GetAuthTokenMOCK,
  GetParametersForOperationsMOCK,
  GetListEquipmentTypesMOCK,
  GetListActivityMOCK,
  GetEquipmentListByTypeMOCK
};