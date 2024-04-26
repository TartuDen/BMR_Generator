import axios from "axios";
async function postDataToEndpoint(dataArray) {
    try {
        for (const data of dataArray) {
            const response = await axios.post('http://localhost:8085/equipment', data);
            console.log('Data posted successfully:', response.data);
        }
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

var activities = [
    {
      "name": "balances",
      "equipmentInfo":[
        { "code": "007-1", "description": "max=3kg" },
        { "code": "007-10", "description": "max=2kg"},
        { "code": "007-12", "description": "max=1kg" },
        { "code": "007-16", "description": "max=220kg" },
        { "code": "007-21", "description": "max=1.3kg" },
        { "code": "007-25", "description": "max=3.5kg" },
        { "code": "007-26", "description": "max=3.5kg" },
        { "code": "007-27", "description": "max=3.5kg" },
        { "code": "007-34", "description": "max=3.5kg" },
        { "code": "007-6", "description": "max=10kg" },
        { "code": "007-20", "description": "max=3kg" },
        { "code": "007-23", "description": "max=150kg" },
        { "code": "007-24", "description": "max=30kg" },
        { "code": "007-39", "description": "max=30kg" },
        { "code": "007-40", "description": "max=30kg" },
        { "code": "007-41", "description": "max=3kg" },
        { "code": "007-42", "description": "max=30kg" },
        { "code": "007-43", "description": "max=1kg" },
        { "code": "007-44", "description": "max=120kg" },
        { "code": "007-45", "description": "max=60kg" }],
      "operations": []
    },
    {
      "name": "reactor",
      "equipmentInfo":[
        { "code": "002-10", "description":"30L glass" },
        { "code": "002-11", "description":"15L glass" },
        { "code": "002-12", "description":"150L glass" },
        { "code": "002-13", "description":"100L glass" },
        { "code": "002-14", "description":"100L g-lined" },
        { "code": "002-15", "description":"150L glass" },
        { "code": "002-16", "description":"50L glass" },
        { "code": "002-17", "description":"100L glass" }
      ],
      "operations": [
        {
            "operationType": "prepare_of_reactor",
            "content": "Reactor preparation:\nThe reactor {reactor} and thermostat are checked to be ready for work.",
            "other": ""
        },
        {
            "operationType": "material_load_of_solid",
            "content": "Loading into reactor:\nRequired amount of {material} is weighed on the balances. \nWeighted material is loaded into reactor {reactor} in portions.\n\nSpecified amount: ….. kg (….. - ….. kg)",
            "other": "Warehouse \"code\": ...........\nActual loading: ....... kg"
        },
        {
            "operationType": "material_load_of_liquid",
            "content": "Loading into reactor:\nRequired amount of {material} is weighed on the balances. \nUsing peristaltic pump {p_pump}, weighted material is pumped into the reactor.\n\nSpecified amount: ….. kg (….. - ….. kg)",
            "other": "Warehouse \"code\": ...........\nActual loading: ....... kg\nActual pump setting: ..... %"
        },
        {
            "operationType": "material_load_drop_funnel",
            "content": "Loading into dropping funnel:\nThe required amount of {material} is weighed on the balances. \nUsing peristaltic pump {p_pump}, weighted material is pumped into the dosing system.\n\nSpecified amount: ….. kg (….. - ….. kg)",
            "other": "Warehouse \"code\": ...........\nActual loading: ....... kg\nActual pump setting: ..... %"
        },
        {
            "operationType": "material_add_dropwise",
            "content": "Dropwise addition:\nMaterial is added dropwise from dropping funnel.\nAddition is temperature controlled.\nKeep the temperature of reaction mixture in range {targetTempMin}{targetTempMax}°C.\nStirring is set to range {rpmMin}{rpmMax} rpm.",
            "other": "Actual thermostat setting: ..... °C\nActual stirring setting: .... rpm"
        },
        {
            "operationType": "argon_start_flow",
            "content": "Argon flow:\nArgon line is connected and set to {flowMin}{flowMax} l/min.",
            "other": "Actual flow setting: .... l/min"
        },
        {
            "operationType": "argon_stop_flow",
            "content": "The argon flow is closed.",
            "other": "Actual flow setting: .... l/min"
        },
        {
            "operationType": "reaction_hold_time",
            "content": "Hold time:\nReaction mixture is stirred during {durationMin}{durationMax}.\nTemperature set is {targetTempMin}{targetTempMax}°C.\nStirring is set to {rpmMin}{rpmMax} rpm.",
            "other": "Actual temp setting: ..... °C\nActual stirring setting: .... rpm"
        },
        {
            "operationType": "reaction_heat/cool_ON",
            "content": "<Heating/cooling> of reactor {reactor} is turned ON.\nThe target temperature range is {targetTempMin}{targetTempMax}°C.",
            "other": "Actual temp setting: ..... °C"
        },
        {
            "operationType": "vac_dist.",
            "content": "Vacuum distillation:\nSolvent is distilled out from reactor.\nTap water for condenser is turned ON.\nHeating is set {targetTempMin}{targetTempMax}°C.\nStirring is set {rpmMin}{rpmMax} rpm.\nVacuum is gradually decreased in range {vpumpTorrMin}{vpumpTorrMax} torr.\nDistillation is continued until <conditions>.",
            "other": "Actual temp setting: ..... °C\nActual stirring setting: ..... rpm\nActual vacuum setting: ..... Torr"
        },
        {
            "operationType": "material_unload",
            "content": "<Solution/suspension> from reactor is pumped using peristaltic pump into <to where?>.",
            "other": ""
        }
        
      ]
    },
    {
      "name": "d_filter",
      "equipmentInfo":[
        {"code": "046-4", "description":"ss 40/80L" },
        {"code": "046-6", "description":"ss 30/45L" },
        {"code": "046-7", "description":"ss agit 100/140L" }
      ],
      "operations": [
   
            {
                "operationType": "prepare_filter",
                "content": "Filter preparation:\nThe filter {d_filter} is assembled and prepared to work.\nThe filtration cloth is prepared and properly installed.\nArgon and product lines are connected to the lid, pressure test is done.",
                "other": ""
            },
            {
                "operationType": "load_on_filter",
                "content": "Product is loaded from reactor {reactor} on the filter {d_filter}.\nThe Argon line is closed during loading.\nOnce 2/3 of the filter is loaded, stop pumping and close the product line.",
                "other": ""
            },
            {
                "operationType": "filtration_with_argon",
                "content": "Filtration:\nProduct is filtrated using argon flow {flowMin}{flowMax} l/min",
                "other": ""
            },
            {
                "operationType": "discharg_ML",
                "content": "Emptying the receiver:\nFiltrate is discharged from the filter into <to where>",
                "other": ""
            },
            {
                "operationType": "wash_FK",
                "content": "Washing filter cake:\nFilter cake is washied with required amount of solvent {material}.\nAfter loading, the solvent is pushed through the filter cake with argon pressure {flowMin}{flowMax} l/min.\n\nSpecified amount: ….. kg (….. - ….. kg)",
                "other": "Warehouse \"code\": ...........\nActual loading: ....... kg"
            },
            {
                "operationType": "dry_on_filter",
                "content": "Drying on filter:\nThe filter cake is additionally dried on the filter {d_filter} using argon flow.\nArgon is set to {flowMin}{flowMax} l/min.\nDrying on the filter is continued for {durationMin}{durationMax} min.",
                "other": "Actual flow setting: .... l/min"
            },
            {
                "operationType": "unload_from_filter",
                "content": "Material from the filter {d_filter} is unloaded <to where>.",
                "other": "Actual weigh: ....... kg"
            }
      
      ]
    },
    {
      "name": "n_filter",
      "equipmentInfo":[
        { "code": "046-1", "description":"" },
        { "code": "046-13", "description":"" },
        { "code": "046-14", "description":"" },
        { "code": "046-2", "description":"" },
        { "code": "046-3", "description":"" }
      ],
      "operations": [
        {
            "operationType": "prepare_filter",
            "content": "Filter preparation:\nThe filter {n_filter} is assembled and prepared to work.\nThe filtration cloth is prepared and properly installed.\nMembrane pump {m_pump} is connected.",
            "other": ""
        },
        {
            "operationType": "load_on_filter",
            "content": "Membrane pump {m_pump} is started.\nThe product is loaded on the filter {n_filter}.",
            "other": ""
        },
        {
            "operationType": "discharg_ML",
            "content": "Emptying the receiver:\nFiltrate is discharged from the filter into <to where>",
            "other": ""
        },
        {
            "operationType": "wash_FK",
            "content": "Washing filter cake:\nMake sure the pump is stopped.\nThe required amount of {material} is weighed on the balances {balances} and loaded on top of filter cake.\nThe filter cake is thoroughly mixed.\n\nSpecified amount: ….. kg (….. - ….. kg)",
            "other": "Warehouse \"code\": ...........\nActual loading: ....... kg"
        },
        {
            "operationType": "dry_on_filter",
            "content": "Drying on filter:\nThe filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it.\nMembrane pump {m_pump} is set to range {vpumpTorrMin}{vpumpTorrMax} Torr.\nDrying on the filter is continued for {durationMin}{durationMax} min.\nAfter the required time is passed, the pump is stopped.",
            "other": "Actual plump setting: ..... Torr"
        },
        {
            "operationType": "unload_from_filter",
            "content": "The material from the filter is unloaded <to where>.",
            "other": "Actual weight: ....... kg"
        }
      ]
    },
    {
      "name": "p_pump",
      "equipmentInfo":[
        {"code": "001-13", "description":"" },
        {"code": "001-21", "description":"" },
        {"code": "001-29", "description":"" }
      ],
      "operations": [
        {
          "operationType": "pump_ON",
          "content": "Peristaltic pump {p_pump} is set to {ppumpSetMin} {ppumpSetMax} %.\nPump is turned ON",
          "other": ""
        }
      ]
    },
    {
      "name": "conv_oven",
      "equipmentInfo":[
        {"code": "012-13", "description":"" },
        {"code": "012-14", "description":"" },
        {"code": "012-16", "description":"" },
        {"code": "012-6", "description":"" },

      ],
      "operations": [
        {
            "operationType": "material_load_on_trays",
            "content": "Product is loaded on trays.\nEach tray is weighed on balances {balances}, data is recorded into Table <number>.\nTray is placed into drying oven.\nAfter all product is loaded on trays and placed into oven, the oven is clodes.\nHeating is set {targetTempMin}{targetTempMax}°C.\nTimer is set to {durationMin}{durationMax}.\nThe dryining starts.",
            "other": ""
        }
      ]
    },
    {
        "name": "vac_oven",
        "equipmentInfo":[
            {"code": "012-10", "description":"" },
            {"code": "012-15", "description":"" },
            {"code": "012-17", "description":"" },
            {"code": "012-9", "description":"" }
          ],
        "operations": []
      },
      {
          "name": "o_pump",
          "equipmentInfo":[
            {"code": "001-38", "description":"" },
            {"code": "001-43", "description":"" }
          ],
          "operations": []
        },
        {
            "name": "m_pump",
            "equipmentInfo":[
                { "code": "001-22", "description":"" },
                { "code": "001-23", "description":"" },
                { "code": "001-24", "description":"" }
              ],
            "operations": []
          }
  ];

  await postDataToEndpoint(activities);