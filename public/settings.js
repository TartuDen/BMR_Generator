const settings = {
  databaseServerUrl: "http://localhost:8080/",
  equipmentApiEndpoint: "/api/equipment",
  equipmentTypesApiEndpoint: "/api/equipment/types",
  activityApiEndpoint: "/api/activities",
  parametersApiEndpoint: "/api/parameters",
  authApiEndpoint: "/login"
};

// Export the settings object so it can be imported in other files
window.settings = settings;