## Flow of Operations and Data

1. **app.get("/") Handler**:
   - When a GET request is made to "/", the server responds by retrieving equipment names and codes for each equipment type from the server using the `eqNameCodeFromServer` function.
   - The server returns data in the form of:
     ```
     eqNameCodeFromServer = {
       reactor: [
         { name: 'reactor', code: '002-10', description: '30L glass' },
       ]
     }
     ```
        // following are filled only after data was selected at least once.
    ```
        equipmentListMemory = 
            [
                { name: 'reactor', code: '002-10', condition: true },
                { name: 'reactor', code: '', condition: false },
            ]
    
            materialsMemory = [ { 'reagent A': '11' } ]

            projectListMemory = [ 'tile', 'tp.5' ]
     ```
2. **Initial Page Load (HTML and JS)**:
   - When the HTML page is loaded, it requests equipment types from the server using the `populateEquipmentTypes()` function.
   - Upon loading, the `window.onload` event triggers the `populateEquipmentTypes()` function. 

3. **populateEquipmentTypes() - Function to populate equipment types in a select element**:
   - Retrieves equipment types from the server and populates the equipment type dropdown list in the HTML.
   - The user selects an equipment type, triggering the `populateActivityType()` function.

4. **populateActivityType() - Function to populate activity types in a select element**:
   - Retrieves activity types based on the selected equipment type from the server using the `getActivityType()` function.
   - Populates the activity type dropdown list in the HTML.
   - Listens for changes in the selected activity type.

5. **getActivityType() - Function to get activity types based on selected equipment type**:
   - Sends a request to the server to get activity types based on the selected equipment type
      e.g. `await axios.post("http://localhost:8081/filter?equipmentType=" + dataFromOperation["equipmentType"]);`.
   - Receives activity types as a response from the server.
   e.g. if selected dataFromOperation["equipmentType"] === "reactor", the responce will be list of activities like:
      ```{
         "Equipment": "reactor",
         "OperationType": "material_unload",
         "Content": "<Solution/suspension> from reactor is pumped using peristaltic pump {p_pump} and norprene hose \"{hose}\".\nOne end of the hose is connected to the bottom valve of reactor {reactor}.\nSecond end passed through the peristaltic pump and into <to where?>.",
         "Other": ""
      }```

6. **populateOther()**:
   - Populates the "Other" field based on the selected activity type. Retrieves additional information about the activity type from the server.
   - Updates the HTML to display the additional information.

7. **populateDescription()**:
   - Populates the description field based on the selected activity type.
   - Replaces placeholders in the description text with select lists or input elements.
   - Updates the HTML to display the populated description.

8. **parseDataToOperation()**:
   - Parses user-selected data and input into an `Operation` object.
   - Sends the `Operation` object to the local server via a POST request.
   - Reloads the page upon successful submission.

9. **saveSelectedItem()**:
   - Saves the selected item (equipment type, activity type, or input value) into the `dataFromOperation` object.
   - Updates the `dataFromOperation` object with the selected value.
   - Logs the updated `dataFromOperation` object to the console.
