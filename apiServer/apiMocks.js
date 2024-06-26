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
    return ["durationRange", "targetTempRange", "initialTempSet", "finalTempSet", "processTemp", "rpmRange", "flowRange", "ppumpSetRange", "vpumpTorrProcess", "vpumpTorrRange",];
}

/**
 * Simulates retrieving a list of equipment types with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment types.
 */
async function GetListEquipmentTypesMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
    return [
      {name: "reactor"},
      {name: "oven"},
      {name: "balances"},
      {name: "d_filter"},
      {name: "n_filter"},
      {name: "m_pump"},
      {name: "p_pump"},
  ];
}

/**
 * Simulates retrieving a list of activities for Reactor equipment - equipmentType with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of activities.
 */
async function GetListActivityMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  let activities = [
    {
      Equipment: "reactor",
      OperationType: "prepare_of_reactor",
      Content:
      `Reactor preparation:
The reactor {reactor} and thermostat are checked to be ready for work. 
A stirrer drive is installed.
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
      `Loading into reactor:
Required amount of {material} is weighed on the balances {balances} into jug "{jug}" using a plastic scoop. 
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
      `Loading into reactor:
Required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the reactor via a liquid loading valve. 
The peristaltic pump is set to {ppumpSetRange}%. 
After loading is done, the pump is stopped, and the hose is removed. 
The 60 mm flange port is closed. 
The hose is cleaned and dried.

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
      OperationType: "material_load_drop_funnel",
      Content:
        `Loading into dropping funnel:
The required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the dosing system. 
The peristaltic pump is set to {ppumpSetRange}%. 
After loading is done, the pump is stopped, hose is removed. 
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
      OperationType: "material_add_dropwise",
      Content:
        `Dropwise addition:
Material is added dropwise from dropping funnel.
Addition is temperature controlled.
Keep the temperature of reaction mixture in range {targetTempRange}°C.
Set the thermostat to the temperature {initialTempSet}°C.
Once temperaute in require range, change the setting of thermostat to {finalTempSet}°C.
Stirring is set to range {rpmRange} rpm.`,
Other:
`Actual thermostat
setting: ..... °C
Actual stirring
setting: .... rpm
`
    },
    {
      Equipment: "reactor",
      OperationType: "argon_start_flow",
      Content:
      `Argon flow:
Argon line is connected to the argon port of reactor {reactor}. 
The Argon flow is set to {flowRange}l/min. 
The valve is opened.`,
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
        `Hold time:
Reaction mixture is stirred during {durationRange} . 
Temperature set is {targetTempRange}°C. 
Stirring is set to {rpmRange} rpm.`,
Other:
`Actual temp
setting: ..... °C
Actual stirring
setting: .... rpm`
    },
    {
      Equipment: "reactor",
      OperationType: "reaction_stir_ON",
      Content: `Stirring in reactor {reactor} is turned ON. 
Set to {rpmRange} rpm.`,
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
      `<Heating/cooling> of reactor {reactor} is turned ON.
The target temperature range is {targetTempRange}°C.  
Temperature is set to {initialTempSet}°C. 
Once the temperature is in a given range, the setting is changed to {finalTempSet}°C.`,
Other:
`Actual temp
setting: ..... °C`
    },
    {
      Equipment: "reactor",
      OperationType: "vac_dist.",
      Content:
      `Vacuum distillation:
Solvent is distilled out from reactor.
Tap water for condenser is turned ON.
Heating is set {targetTempRange}°C.
Stirring is set {rpmRange} rpm.
Membrane pump is connected via cold trap and turned ON.
Vacuum is gradually decreased in range {vpumpTorrRange} torr.
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
      `Filter preparation:
The filter {d_filter} is assembled and prepared to work. 
The filtration cloth is prepared and properly installed. 
Argon and product lines are connected to the lid, pressure test is done.`,
    Other:
    ``
    },
    {
      Equipment: "d_filter",
      OperationType: "load_on_filter",
      Content:
      `Product is loaded from reactor {reactor} on the filter {d_filter} via product line. 
The Argon line is closed during loading. 
Once 2/3 of the filter is loaded, stop pumping and close the product line.`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `filtration_with_argon`,
      Content:
      `Filtration:
Check that the product line is closed, and check the pressure on Argon cylinder, it must be in the range 0.5-1bar. 
Open the argon line on the lid of the filter {d_filter} and wait until no more or very little of ML is coming into the receiver (visually on the level tube). 
At the end of operation close the argon line.`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `discharg_ML`,
      Content:
      `Emptying the receiver:
Check that the product line and argon line are closed. 
Release the top valve on the receiver to make sure there is no extra pressure. 
Connect peristaltic pump {p_pump} to the bottom valve of the filter {d_filter} using norprene hose "{hose}". 
The second end of the hose is securely fixed into the receiving container canister, set the speed of the peristaltic pump {ppumpSetRange} %. 
Start the pump. Continue the process until all ML is unloaded into the receiver.`,
     Other:
      ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `wash_FK`,
      Content:
      `Washing filter cake:
The lid of filter {d_filter} is opened. 
The required amount of {material} is weighed on the balances {balances} using a jug "{jug}". 
The solvent is loaded on top of the filter cake, using shovel "{shovel}" the filter cake is thoroughly mixed. 
The lid is closed.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`,
    },
    {
      Equipment: `d_filter`,
      OperationType: `dry_on_filter`,
      Content:
      `Drying on filter:
The filter cake is additionally dried on the filter {d_filter} using argon flow. 
Argon is set to {flowRange} l/min, check that the outlet valve is opened and the stream is led to the ventilation. 
Argon line is opened. 
Drying on the filter is continued for {durationRange} min. 
After the required time is passed, the argon line is closed.`,
Other:
`Actual flow
setting: .... l/min` 
    },

    {
      Equipment: `d_filter`,
      OperationType: `unload_from_filter`,
      Content:
        `The lid of the filter {d_filter} is opened. 
Material from the filter is unloaded using shovel "{shovel}" <to where>.

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
      `Filter preparation:
The filter {n_filter} is assembled and prepared to work. 
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
      `Emptying the receiver:
Stop the pump. 
Connect peristaltic pump {p_pump} to the bottom valve of the filter using norprene hose "{hose}". 
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
      `Washing filter cake:
Make sure the pump is stopped. 
The required amount of material is weighed on the balances {balances} using a jug "{jug}". 
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
      `Drying on filter:
The filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it. 
Membrane pump {m_pump} is set to range {vpumpTorrRange} Torr. 
Drying on the filter is continued for {durationRange}  min. 
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
      Equipment: `p_pump`,
      OperationType: `pump_ON`,
      Content: `Peristaltic pump {p_pump} is set to {ppumpSetRange} %.
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
Heating is set {targetTempRange}°C.
Timer is set to {durationRange} .
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
  };

  // Return the simulated equipment list for the specified type
  return equipmentMap[equipmentType] || [];
}





/**
 * Simulates retrieving a list of activities for Reactor equipment - equipmentType with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of activities.
 */
async function GetListNonGMPActivityMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  let activities = [
    {
      Equipment: "reactor",
      OperationType: "prepare_of_reactor",
      Content:
      `Reactor preparation:
The reactor {reactor} and thermostat are checked to be ready for work.`,
      Other:
      ``
    },
    {
      Equipment: "reactor",
      OperationType: "material_load_of_solid",
      Content:
      `Loading into reactor:
Required amount of {material} is weighed on the balances. 
Weighted material is loaded into reactor {reactor} in portions.

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
      `Loading into reactor:
Required amount of {material} is weighed on the balances. 
Using peristaltic pump  {p_pump}, weighted material is pumped into the reactor.

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
      OperationType: "material_load_drop_funnel",
      Content:
        `Loading into dropping funnel:
The required amount of {material} is weighed on the balances. 
Using peristaltic pump  {p_pump}, weighted material is pumped into the dosing system.

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
      OperationType: "material_add_dropwise",
      Content:
        `Dropwise addition:
Material is added dropwise from dropping funnel.
Addition is temperature controlled.
Keep the temperature of reaction mixture in range {targetTempRange}°C.
Stirring is set to range {rpmRange} rpm.`,
Other:
`Actual thermostat
setting: ..... °C
Actual stirring
setting: .... rpm
`
    },
    {
      Equipment: "reactor",
      OperationType: "argon_start_flow",
      Content:
      `Argon flow:
Argon line is connected and set to {flowRange}l/min.`,
    Other:
`Actual flow
setting: .... l/min`
    },
    {
      Equipment: "reactor",
      OperationType: "argon_stop_flow",
      Content:
      `The argon flow is closed.`,
    Other:
`Actual flow
setting: .... l/min`
    },
    {
      Equipment: "reactor",
      OperationType: "reaction_hold_time",
      Content:
        `Hold time:
Reaction mixture is stirred during {durationRange} . 
Temperature set is {targetTempRange}°C. 
Stirring is set to {rpmRange} rpm.`,
Other:
`Actual temp
setting: ..... °C
Actual stirring
setting: .... rpm`
    },

    {
      Equipment: "reactor",
      OperationType: "reaction_heat/cool_ON",
      Content:
      `<Heating/cooling> of reactor {reactor} is turned ON.
The target temperature range is {targetTempRange}°C.`,
Other:
`Actual temp
setting: ..... °C`
    },
    {
      Equipment: "reactor",
      OperationType: "vac_dist.",
      Content:
      `Vacuum distillation:
Solvent is distilled out from reactor.
Tap water for condenser is turned ON.
Heating is set {targetTempRange}°C.
Stirring is set {rpmRange} rpm.
Vacuum is gradually decreased in range {vpumpTorrRange} torr.
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
      OperationType: "material_unload",
      Content:
      `<Solution/suspension> from reactor is pumped using peristaltic pump into <to where?>.`,
Other:``
    },

    {
      Equipment: "d_filter",
      OperationType: "prepare_filter",
      Content:
      `Filter preparation:
The filter {d_filter} is assembled and prepared to work. 
The filtration cloth is prepared and properly installed. 
Argon and product lines are connected to the lid, pressure test is done.`,
    Other:
    ``
    },
    {
      Equipment: "d_filter",
      OperationType: "load_on_filter",
      Content:
      `Product is loaded from reactor {reactor} on the filter {d_filter}. 
The Argon line is closed during loading. 
Once 2/3 of the filter is loaded, stop pumping and close the product line.`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `filtration_with_argon`,
      Content:
      `Filtration:
Product is filtrated using argon flow {flowRange} l/min`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `discharg_ML`,
      Content:
      `Emptying the receiver:
Filtrate is discharged from the filter into <to where>`,
     Other:
      ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `wash_FK`,
      Content:
      `Washing filter cake:
Filter cake is washied with required amount of solvent {material}.
After loading, the solvent is pushed through the filter cake with argon pressure {flowRange} l/min.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`,
    },
    {
      Equipment: `d_filter`,
      OperationType: `dry_on_filter`,
      Content:
      `Drying on filter:
The filter cake is additionally dried on the filter {d_filter} using argon flow. 
Argon is set to {flowRange} l/min.
Drying on the filter is continued for {durationRange} min.`,
Other:
`Actual flow
setting: .... l/min`
    },

    {
      Equipment: `d_filter`,
      OperationType: `unload_from_filter`,
      Content:
        `Material from the filter {d_filter} is unloaded < to where>.`,
        Other:
`Actual weigh:
....... kg`
    },
    {
      Equipment: `n_filter`,
      OperationType: `prepare_filter`,
      Content:
      `Filter preparation:
The filter {n_filter} is assembled and prepared to work. 
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
The product is loaded on the filter {n_filter}.`,
Other:
      ``
    },
    {
      Equipment: `n_filter`,
      OperationType: `discharge_ML`,
      Content:
      `Emptying the receiver:
Filtrate is discharged from the filter into < to where>`,
    Other:
      ``
    },
    {
      Equipment: `n_filter`,
      OperationType: `wash_FK`,
      Content:
      `Washing filter cake:
Make sure the pump is stopped. 
The required amount of {material} is weighed on the balances {balances} and loaded on top of filter cake.
The filter cake is thoroughly mixed.

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
      `Drying on filter:
The filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it. 
Membrane pump {m_pump} is set to range {vpumpTorrRange} Torr. 
Drying on the filter is continued for {durationRange}  min. 
After the required time is passed, the pump is stopped.`,
Other:
`Actual plump
setting: ..... Torr`
    },
    {
      Equipment: `n_filter`,
      OperationType: `unload_from_filter`,
      Content:
        `The material from the filter is unloaded <to where>.`,
    Other:
`Actual weight:
....... kg`
    },
    {
      Equipment: `p_pump`,
      OperationType: `pump_ON`,
      Content: `Peristaltic pump {p_pump} is set to {ppumpSetRange} %.
Pump is turned ON`,
          Other:
      ``
    },
    {
      Equipment: `oven`,
      OperationType: `material_load_on_trays`,
      Content: `Product is loaded on trays.
Each tray is weighed on balances {balances}, data is recorded into Table <number>.
Tray is placed into drying oven.
After all product is loaded on trays and placed into oven, the oven is clodes.
Heating is set {targetTempRange}°C.
Timer is set to {durationRange} .
The dryining starts.`,
          Other:
      ``
    },
  ];


  // Filter activities based on the equipment type
  if (equipmentType) {
    activities = activities.filter(activity => activity.Equipment === equipmentType);
  }
  return activities;
}

// Export all functions together
export {
  GetAuthTokenMOCK,
  GetParametersForOperationsMOCK,
  GetListEquipmentTypesMOCK,
  GetListActivityMOCK,
  GetEquipmentListByTypeMOCK,
  GetListNonGMPActivityMOCK
};