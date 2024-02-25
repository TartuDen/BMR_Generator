const settings = {
  databaseServerUrl: "http://localhost:8081",
  equipmentApiEndpoint: "/api/equipment",
  equipmentTypesApiEndpoint: "/equipment_list",
  activityApiEndpoint: "/api/activities",
  parametersApiEndpoint: "/api/parameters",
};

// Export the settings object so it can be imported in other files
window.settings = settings;