let ops = [
    {
        project: "projectName", 
        TP: "tp name",
        number: 1,
        mainEquipmentType: "reactor",
        typicalActivity:{
            operationType: "material_load_of_solid", 
            content:`Loading into reactor:
            Required amount of {material} is weighed on the balances {balances} into jug "{jug}" using a plastic scoop. 
            Weighted material is loaded into reactor {reactor} in portions via a 60 mm flange port using funnel "{funnel}". 
            The 60 mm flange port is closed.
            
            Specified amount: ….. kg (….. - ….. kg)`, 
            other:`Warehouse code:
            ...........
            Actual loading:
            ....... kg`, 
            durationRange:[], 
            targetTempRange:[], 
            initialTempSet:null, 
            finalTempSet:null, 
            processTemp:null, 
            rpmRange:[], 
            flowRange:[], 
            ppumpSetRange:[], 
            vpumpTorrProcess:null, 
            vpumpTorrRange:[], 
            additionalEquipment: []
        },
        materialIn:[],
        materialOut:[],
        wastes :[]
    }
]