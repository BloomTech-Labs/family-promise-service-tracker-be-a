# JSON Layout/Specifications for Service Entries

This document lays out the formatting for the JSON that is located in the `jsonb` columns known as `service_type_entry_model` in the `service_types` table and `service_entry_data` in the `service_entries` tables.

We are laying out this documentation so that the JSON remains consistent, and ideally, frontend can create fields dynamically by mapping through the JSON.

## Why Use a JSONB Column in PostgreSQL?

---

We've decided to incorporate JSON using the built-in data type in order to allow Program Managers and Administrators flexibility in creating their own form fields from the comfort of their tablets, without the need to have a developer create/edit them. Certain services might require a set of fields that another may not.

For example:

- Child care: May want a field to list a partnering day care, and checkboxes to specify on what days of the week a client needs day care service.
- Bus transportation: May want a dropdown of which bus service a pass was provided for (ex: City Bus, County Bus, Greyhound, etc.)

## But what about SQL queries, can we write still queries to access the information?

---

Yes! So the nice thing about using the native JSON capabilites built into PostgreSQL, is that there is a way to query the JSON. However, there is a special syntax to access that information. Here is some [documentation regarding JSON in PostgreSQL](https://www.postgresql.org/docs/current/datatype-json.html).
<br>
<br>

## Why are there two different jsonb columns?

---

- **`service_type_entry_model`** is where the Program Manager or Admin created schema/model/layout lives. It holds all the information frontend needs to render it, along with potentially useful information about the field for DS.

- **`service_entry_data`** is where the information recorded by the Service Provider is stored. It is barebones representation containing the field name, and the data for that field.

You will need to pull both the model, and the data and combine them for the frontend.

<br>
<br>
<br>
<br>

## Specifications for the `service_type_entry_model` (in the `service_types` table)

---

<br>

| data_type  | Backend Expects | Description                                            |
| :--------- | :-------------- | :----------------------------------------------------- |
| `currency` | `number`        | For prices, etc.                                       |
| `quantity` | `number`        | For non price quantities, ex: number of blankets, etc. |
| `number`   | `number`        | For general number entry                               |
| `date`     | `string`        | For dates: Use Date Picker                             |
| `time`     | `string`        | For times: Use Time Picker                             |
| `text`     | `string`        | For free-form text entry                               |
| `boolean`  | `boolean`       | For true/false options                                 |

<br>

| display_field_as | Description                                                                                                      |
| :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `entry`          | Form field, use validation. If `date` or `time`, use corresponding pickers                                       |
| `dropdown`       | Should display `options` in a dropdown format. Single choice permitted                                           |
| `checkbox`       | Should display `options` in a checkbox format. Allows multiple choices, send to backend as **array** of choices. |

<br>

| Parameter          | Description                                                                                                      |
| :----------------- | :--------------------------------------------------------------------------------------------------------------- |
| `name_of_field`    | This is the name that should be rendered next to the field in the Frontend                                       |
| `description`      | A description of what this field should have in it                                                               |
| `data_type`        | One of the choices in the above table, it should effect form field validation                                    |
| `required`         | Specify if the want this required to be filled out, should effect form validation (True/False, default to False) |
| `display_field_as` | One of the choices in the above table. `dropdown` allows one choice. ``checkbox` allows several choices.         |
| `options`          | An array, it contains the choices used for the `dropdown` or `checkboxes`.                                       |

<br>

```json
service_type_entry_model: {
      "default": [
        {
          "name_of_field": "Cost/Value",
          "description": "Cost/Value in dollars/quantity",
          "data_type": "number",
          "required": false,
          "display_field_as": "entry",
          "options": null,
        },
        {
          "name_of_field": "Duration",
          "description": "How long did this event last in minutes?",
          "data_type": "number",
          "required": true,
          "display_field_as": "text_entry",
          "options": null,
        },
        {
          "name_of_field": "Notes",
          "description": "Notes on how this event.",
          "data_type": "test",
          "required": false,
          "display_field_as": "text_entry",
          "options": null,
        },
        {
          "name_of_field": "Status",
          "description": "What is the status of this event?",
          "data_type": "string",
          "required": false,
          "display_field_as": "dropdown",
          "options":["Completed", "Pending", "In Progress", "Follow Up Required"] ,
        },
        {
          "name_of_field": "Success Rating",
          "description": "How successful was this?",
          "data_type": "number",
          "required": true,
          "display_field_as": "dropdown",
          "options":[0, 1, 2, 3, 4, 5],

        },
      ],
      "custom": [
         {
          "name_of_field": "Days of week with shelter",
          "description": "Days the recipient had shelter (not on the street)",
          "data_type": "string",
          "required": true,
          "display_field_as": "checkbox",
          "options": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
      ],
    }

```

## JSON Data from service_entry_data

```json
{
"default_fields": {
    "cost": 5,
    "duration": 30,
    "notes": "Recipient reported being excited about a new job opportunity",
    "days of week with..." : ["monday", "thursday"],
    "status": "pending"

}

```
