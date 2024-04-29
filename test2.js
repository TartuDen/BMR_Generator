[
  Operation {
    project: 'tile',
    tp: 'tp1',
    opNumber: '1',
    mainEquipmentType: 'reactor',
    typicalActivity: TypicalActivity {
      activityType: 'material_load_of_liquid',
      content: 'Loading into reactor:\r\n' +
        '  Required amount of <select name="material"><option value="">--select--</option><option value="aaaaaaa">aaaaaaa - 2</option><option value="bbbbbbbbb">bbbbbbbbb - 3</option></select> is weighed on the balances <select name="balances"><option value="007-10">007-10</option><option value="007-25">007-25</option></select> using jug "tile undefined". \r\n',
      other: 'Warehouse code:\r\n',
      durationMin: -1,
      durationMax: -1,
      targetTempMin: -1,
      targetTempMax: -1,
      initialTempSet: -1,
      finalTempSet: -1,
      processTemp: -1,
      rpmMin: -1,
      rpmMax: -1,
      flowMin: -1,
      flowMax: -1,
      ppumpSetMin: 20,
      ppumpSetMax: 40,
      vpumpTorrProcess: -1,
      vpumpTorrMin: -1,
      vpumpTorrMax: -1,
      additionalEquipment: [
        {
            name = "reactor",
            code = "002-17",
            label = "",
            size = "150L",
            material = "glass",
            utensils = false
        },
        {
            name = "balances",
            code = "007-26",
            label = "",
            size = "3kg",
            material = "",
            utensils = false
        },
        ,
        {
            name = "hose",
            code = "",
            label = "tile tp.1",
            size = "2m",
            material = "",
            utensils = true
        }
    ]
    },
    materialIn: Material {
            name: "EtOH for washing",
            WHcode: "ETOH 001",
            mass: 5.1,
            volume: -1,
            minMass: 5.0,
            maxMass: 5.2,
            additionalInfo: "flamable liquid"
    },
    materialOut: null,
    wastes: null
  }
]


{
    "project": "tile",
    "tp": "tp1",
    "opNumber": "1",
    "mainEquipmentType": "reactor",
    "typicalActivity": {
      "activityType": "material_load_of_liquid",
      "content": "Loading into reactor:\r\n  Required amount of <select name=\"material\"><option value=\"\">--select--</option><option value=\"EtOH for washing\">EtOH for washing - 2</option><option value=\"EtOH for reaction\">EtOH for reaction - 3</option></select> is weighed on the balances <select name=\"balances\"><option value=\"007-10\">007-10</option><option value=\"007-25\">007-25</option></select> using jug \"tile tp.3\". \r\n",
      "other": "Warehouse code:\r\n",
      "durationMin": -1,
      "durationMax": -1,
      "targetTempMin": -1,
      "targetTempMax": -1,
      "initialTempSet": -1,
      "finalTempSet": -1,
      "processTemp": -1,
      "rpmMin": -1,
      "rpmMax": -1,
      "flowMin": -1,
      "flowMax": -1,
      "ppumpSetMin": 20,
      "ppumpSetMax": 40,
      "vpumpTorrProcess": -1,
      "vpumpTorrMin": -1,
      "vpumpTorrMax": -1,
      "additionalEquipment": [
        {
          "name": "reactor",
          "code": "002-17",
          "label": "",
          "size": "150L",
          "material": "glass",
          "utensils": false
        },
        {
          "name": "balances",
          "code": "007-26",
          "label": "",
          "size": "3kg",
          "material": "",
          "utensils": false
        },
        {
          "name": "hose",
          "code": "",
          "label": "tile tp.1",
          "size": "2m",
          "material": "",
          "utensils": true
        }
      ]
    },
    "materialIn": {
      "name": "EtOH for washing",
      "WHcode": "ETOH 001",
      "mass": 5.1,
      "volume": -1,
      "minMass": 5.0,
      "maxMass": 5.2,
      "additionalInfo": "flamable liquid"
    },
    "materialOut": null,
    "wastes": null
  }
  