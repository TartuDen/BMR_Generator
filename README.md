# Batch Record Creation App for Pharma Manufacturing

## Overview

This application is designed to facilitate the creation of batch records for operators in pharmaceutical manufacturing. It provides a structured table format where operators can input sequential operational details, equipment selections, process descriptions, and record actual data.

## Table Structure

The batch record table consists of the following columns:

1. **Sequential Number**: Sequential numbering of operations.
2. **Main Equipment**: Selection of equipment for the operation along with its code.
3. **Operations and Additional Data**: Description of the operation.
4. **Description**: Detailed process description.
5. **Other**: Empty fields for operators to record actual data.

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

## Process Description Example

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