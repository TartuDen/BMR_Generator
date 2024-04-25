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
          "content":
            `Reactor preparation:
            The reactor {reactor} and thermostat are checked to be ready for work.`,
          "other": ``
        },
        {
          "operationType": "material_load_of_solid",
          "content":
            `Loading into reactor:
            Required amount of {material} is weighed on the balances. 
            Weighted material is loaded into reactor {reactor} in portions.
  
            Specified amount: ….. kg (….. - ….. kg)`,
          "other": `Warehouse "code": ...........
            Actual loading: ....... kg`
        },
        {
          "operationType": "material_load_of_liquid",
          "content":
            `Loading into reactor:
            Required amount of {material} is weighed on the balances. 
            Using peristaltic pump {p_pump}, weighted material is pumped into the reactor.
  
            Specified amount: ….. kg (….. - ….. kg)`,
          "other": `Warehouse "code": ...........
            Actual loading: ....... kg
            Actual pump setting: ..... %`
        },
        {
          "operationType": "material_load_drop_funnel",
          "content":
            `Loading into dropping funnel:
            The required amount of {material} is weighed on the balances. 
            Using peristaltic pump {p_pump}, weighted material is pumped into the dosing system.
  
            Specified amount: ….. kg (….. - ….. kg)`,
          "other": `Warehouse "code": ...........
            Actual loading: ....... kg
            Actual pump setting: ..... %`
        },
        {
          "operationType": "material_add_dropwise",
          "content":
            `Dropwise addition:
            Material is added dropwise from dropping funnel.
            Addition is temperature controlled.
            Keep the temperature of reaction mixture in range {targetTempMin}{targetTempMax}°C.
            Stirring is set to range {rpmMin}{rpmMax} rpm.`,
          "other": `Actual thermostat setting: ..... °C
            Actual stirring setting: .... rpm`
        },
        {
          "operationType": "argon_start_flow",
          "content":
            `Argon flow:
            Argon line is connected and set to {flowMin}{flowMax} l/min.`,
          "other": `Actual flow setting: .... l/min`
        },
        {
          "operationType": "argon_stop_flow",
          "content":
            `The argon flow is closed.`,
          "other": `Actual flow setting: .... l/min`
        },
        {
          "operationType": "reaction_hold_time",
          "content":
            `Hold time:
            Reaction mixture is stirred during {durationMin}{durationMax}.
            Temperature set is {targetTempMin}{targetTempMax}°C.
            Stirring is set to {rpmMin}{rpmMax} rpm.`,
          "other": `Actual temp setting: ..... °C
            Actual stirring setting: .... rpm`
        },
        {
          "operationType": "reaction_heat/cool_ON",
          "content":
            `<Heating/cooling> of reactor {reactor} is turned ON.
            The target temperature range is {targetTempMin}{targetTempMax}°C.`,
          "other": `Actual temp setting: ..... °C`
        },
        {
          "operationType": "vac_dist.",
          "content":
            `Vacuum distillation:
            Solvent is distilled out from reactor.
            Tap water for condenser is turned ON.
            Heating is set {targetTempMin}{targetTempMax}°C.
            Stirring is set {rpmMin}{rpmMax} rpm.
            Vacuum is gradually decreased in range {vpumpTorrMin}{vpumpTorrMax} torr.
            Distillation is continued until <conditions>.`,
          "other": `Actual temp setting: ..... °C
            Actual stirring setting: ..... rpm
            Actual vacuum setting: ..... Torr`
        },
        {
          "operationType": "material_unload",
          "content":
            `<Solution/suspension> from reactor is pumped using peristaltic pump into <to where?>.`,
          "other": ``
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
          "content":
            `Filter preparation:
            The filter {d_filter} is assembled and prepared to work.
            The filtration cloth is prepared and properly installed.
            Argon and product lines are connected to the lid, pressure test is done.`,
          "other": ``
        },
        {
          "operationType": "load_on_filter",
          "content":
            `Product is loaded from reactor {reactor} on the filter {d_filter}.
            The Argon line is closed during loading.
            Once 2/3 of the filter is loaded, stop pumping and close the product line.`,
          "other": ``
        },
        {
          "operationType": "filtration_with_argon",
          "content":
            `Filtration:
            Product is filtrated using argon flow {flowMin}{flowMax} l/min`,
          "other": ``
        },
        {
          "operationType": "discharg_ML",
          "content":
            `Emptying the receiver:
            Filtrate is discharged from the filter into <to where>`,
          "other": ``
        },
        {
          "operationType": "wash_FK",
          "content":
            `Washing filter cake:
            Filter cake is washied with required amount of solvent {material}.
            After loading, the solvent is pushed through the filter cake with argon pressure {flowMin}{flowMax} l/min.
  
            Specified amount: ….. kg (….. - ….. kg)`,
          "other": `Warehouse "code": ...........
            Actual loading: ....... kg`
        },
        {
          "operationType": "dry_on_filter",
          "content":
            `Drying on filter:
            The filter cake is additionally dried on the filter {d_filter} using argon flow.
            Argon is set to {flowMin}{flowMax} l/min.
            Drying on the filter is continued for {durationMin}{durationMax} min.`,
          "other": `Actual flow setting: .... l/min`
        },
        {
          "operationType": "unload_from_filter",
          "content":
            `Material from the filter {d_filter} is unloaded <to where>.`,
          "other": `Actual weigh: ....... kg`
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
          "content":
            `Filter preparation:
            The filter {n_filter} is assembled and prepared to work.
            The filtration cloth is prepared and properly installed.
            Membrane pump {m_pump} is connected.`,
          "other": ``
        },
        {
          "operationType": "load_on_filter",
          "content":
            `Membrane pump {m_pump} is started.
            The product is loaded on the filter {n_filter}.`,
          "other": ``
        },
        {
          "operationType": "discharg_ML",
          "content":
            `Emptying the receiver:
            Filtrate is discharged from the filter into <to where>`,
          "other": ``
        },
        {
          "operationType": "wash_FK",
          "content":
            `Washing filter cake:
            Make sure the pump is stopped.
            The required amount of {material} is weighed on the balances {balances} and loaded on top of filter cake.
            The filter cake is thoroughly mixed.
  
            Specified amount: ….. kg (….. - ….. kg)`,
          "other": `Warehouse "code": ...........
            Actual loading: ....... kg`
        },
        {
          "operationType": "dry_on_filter",
          "content":
            `Drying on filter:
            The filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it.
            Membrane pump {m_pump} is set to range {vpumpTorrMin}{vpumpTorrMax} Torr.
            Drying on the filter is continued for {durationMin}{durationMax} min.
            After the required time is passed, the pump is stopped.`,
          "other": `Actual plump setting: ..... Torr`
        },
        {
          "operationType": "unload_from_filter",
          "content":
            `The material from the filter is unloaded <to where>.`,
          "other": `Actual weight: ....... kg`
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
          "content": `Peristaltic pump {p_pump} is set to {ppumpSetMin} {ppumpSetMax} %.
            Pump is turned ON`,
          "other": ``
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
          "content": `Product is loaded on trays.
            Each tray is weighed on balances {balances}, data is recorded into Table <number>.
            Tray is placed into drying oven.
            After all product is loaded on trays and placed into oven, the oven is clodes.
            Heating is set {targetTempMin}{targetTempMax}°C.
            Timer is set to {durationMin}{durationMax}.
            The dryining starts.`,
          "other": ``
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
          },
          {
              "name": "",
              "equipmentInfo":[
                  {"code": "001-13", "description":"" },
                  {"code": "001-21", "description":"" },
                  {"code": "001-29", "description":"" }
                ],
              "operations": []
            }
  ];