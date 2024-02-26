# Batch Record Creation App for Pharma Manufacturing

## Overview

This application is designed to facilitate the creation of batch records for production in GMP pharmaceutical manufacturing. 
It consists of **login page**, and **creation page**.
On the login page, the user can enter the login and password. Or create a new user.
After login, the user is redirected to the creation page.
The creation page has a table.
A table header is where the user inputs project and process related data, like:
1. Project name.
2. TP (technological process) of the current batch record.
3. Select the main equipment for the given process, from the equipment list. Such as a reactor, oven, and filter.
4. Inputs main materials that are going into the process.  For example: EtNH2;

## Login page
Simple login page with email and password

## Creation page

### Table Structure

###*Header*
On the header of the table we have different section for different type of equipment, for example 2 drop down lists for reactors, 2 dd lists for pumps, 2 dd lists for balances.

###*Creation part*

The batch record table consists of the following columns:
1. **Sequential Number**: Sequential numbering of operations.
2. **Equipment and Activity Type**: Selection of equipment for the operation along with its code. Based on equipment selected, second drop down list is populated with relative operations for this equipment.
3. **Description**: main equipment and acitvity type are selected, description will be loaded from the data base. The description has specail placeholders for selection additional data, like <additional equipment>, <setting for equipment>, <material that is used in operation>;
4. **Other**: Empty fields for operators to record actual data.

## Equipment Types

The application supports various equipment types commonly used in pharmaceutical manufacturing, including:

- Reactor
- Oven
- Peristaltic Pump
- Membrane Pump
- Oil Pump
- Druck Filter
- Nutsch Filter
- Balances

## User case example.

### Header
After login, we start with header of the table. Header consists of 2 columns:
![alt text](img\header.png)

**Main Equipment**
1. **Reactor** drop down list we select reactor 002-17; Second reacotor in second dd list will remain empty, our process requires only one reactor.
2. **Oven** - 012-13
3. **Balances** - 007-42 and 007-10;
4. **Peristaltic pump** - 001-13;
5. **Membrane Pump** - 001-22;

**Materials**
1. In empty fields type names of the reagents / starting materials or solvents.



Here's an example of how the process description is structured:

- **Equipment Type**: Reactor
  - **Equipment Code**: 002-10
    - **Type of Activity**: Loading of Solid
        **Description**:
            Required amount of {material} is weighed on the balances {balances} using jug {jug}.
            Material is loaded into reactor {equipmentCode} via 60 mm flange port using funnel {funnel}.
            The 60 mm flange port is closed.
            ***NB!In the description, variables within curly braces {} indicate placeholders for specific details that need to be filled in by the operator, such as materials, balances, jug, and funnel.***
    *(next options appear in the table IF listed in the description)*
    - **durationMin/Max,°C**: 15-25°C
    - **additional equipment**
        --***balances***: 007-42;
        --***jug***: tile
        --***funnel***: tile