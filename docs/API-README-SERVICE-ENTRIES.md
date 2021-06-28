# JSON Layout/Specifications for Service Entries

#### 👉👉 **_Please Right Click The File Name And Select "Open Preview" For The Best Experience_**

<br>

This document lays out the formatting for the JSON that is located in the `jsonb` columns known as `service_type_entry_model` in the `service_types` table and `service_entry_data` in the `service_entries` tables.

We are laying out this documentation so that the JSON remains consistent, and ideally, frontend can create fields dynamically by mapping through the JSON.

## Why Use a JSONB Column in PostgreSQL?

---

We've decided to incorporate JSON using the built-in data type in order to allow Program Managers and Administrators flexibility in creating their own form fields from the comfort of their tablets, without the need to have a developer create/edit them. Certain services might require a set of fields that another may not.

For example:

- Child care: May want a field to list a partnering day care, and checkboxes to specify on what days of the week a client needs day care service.
- Bus transportation: May want a dropdown of which bus service a pass was provided for (ex: City Bus, County Bus, Greyhound, etc.)

## But what about SQL queries, can we still write queries to access the information?

---

Yes! So the nice thing about using the native JSON capabilites built into PostgreSQL, is that there is a way to query the JSON. However, there is a special syntax to access that information. Here is some [documentation regarding JSON in PostgreSQL](https://www.postgresql.org/docs/current/datatype-json.html).
<br>
<br>
[_Here's a good video on how to use the JSONB queries in raw SQL_](https://youtu.be/yrxCZLAN63E?t=476). It goes from basic to advanced.
<br>
<br>

### Example Query:

- In raw SQL: Return the status options that are available in the service_type_entry_model

```SQL
--- Easiest way, relies on array location being known:
SELECT DISTINCT
	SERVICE_TYPE_ENTRY_MODEL -> 'default' -> 3 -> 'options'
		AS STATUS_CHOICES
FROM SERVICE_TYPES


--- Same as above, different writing style (preview displays incorrect):
SELECT DISTINCT
	SERVICE_TYPE_ENTRY_MODEL #> '{default, 3, options}'
		AS STATUS_CHOICES
FROM SERVICE_TYPES


--- Hardest Way, does not care about the array index:
SELECT DEFAULT_FIELDS -> 'options' AS STATUS_CHOICES
FROM
	(SELECT
	 	DISTINCT
	 		JSONB_ARRAY_ELEMENTS(SERVICE_TYPE_ENTRY_MODEL -> 'default')
	 	AS DEFAULT_FIELDS
		FROM "service_types") AS CHOICE
WHERE DEFAULT_FIELDS ->> 'name_of_field' = 'Status'
```

- In JavaScript:

  **Hint: Use backticks in raw, it'll let you do line breaks and format more nicely**

```JS
// Using as much of the built in knex as possible:
const getStatusChoices = async() => {
  return await knex
    .select(knex.raw(`default_fields -> 'options' AS status_choices`))
    .from(
      knex
        .select(
          knex.raw(`
            DISTINCT jsonb_array_elements(service_type_entry_model -> 'default') AS default_fields
          `)
        )
        .from('service_types')
        .as('choice')
    )
    .where(knex.raw(`default_fields ->> 'name_of_field' = 'Status'`))
    .first();
};

// Returns the following JSON from Postman:
  {
    "status_choices": [
        "Completed",
        "Pending",
        "In Progress",
        "Follow Up Required"
    ]
  }


// You can also just slap in a raw SQL query and deal with it that way:
const getStatusChoices = async() => {
  const { rows } = await knex.raw(`
  SELECT DISTINCT
	  SERVICE_TYPE_ENTRY_MODEL -> 'default' -> 3 -> 'options'
		  AS STATUS_CHOICES
  FROM SERVICE_TYPES
  `);
  return rows[0];
};

// Returns the same result as above
```

<br>
<br>
## Why are there two different jsonb columns?

---

- **`service_type_entry_model`** is where the Program Manager or Admin created schema/model/layout lives. It holds all the information frontend needs to render it, along with potentially useful information about the field for DS.

- **`service_entry_data`** is where the information recorded by the Service Provider is stored. It is barebones representation containing the field name, and the data for that field.

You will need to pull both the model, and the data and combine them for the frontend.

<br>
<br>

## Why is it split up between default and custom?

---

When getting together with the DS team, it was decided it would be easier if they had a certain set of fields they always knew were going to be accessible for every new service type.

<br>
<br>

## Specifications for the `service_type_entry_model` (in the `service_types` table)

---

<br>

| data_type  | Backend Expects | Description                                              |
| :--------- | :-------------- | :------------------------------------------------------- |
| `currency` | `number`        | For prices, etc.                                         |
| `quantity` | `number`        | For non price quantities, ex: number of blankets, etc.   |
| `number`   | `number`        | For general number entry                                 |
| `date`     | `string`        | For dates: Use Date Picker                               |
| `time`     | `string`        | For times: Use Time Picker                               |
| `text`     | `string`        | For free-form text entry                                 |
| `boolean`  | `boolean`       | For true/false options. Should be displayed as dropdown. |

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
| `required`         | Specify if the want this required to be filled out, should effect form validation (true/false, default to false) |
| `display_field_as` | One of the choices in the above table. `dropdown` allows one choice. ``checkbox` allows several choices.         |
| `options`          | An array, it contains the choices used for the `dropdown` or `checkboxes`.                                       |

<br>

```json
service_type_entry_model: {
      "default": [
        {
          "name_of_field": "Value/Quantity",
          "description": "Enter the amount of Value/Quantity",
          "data_type": "number",
          "required": false,
          "display_field_as": "entry",
          "options": null,
        },
        {
          "name_of_field": "Unit of Value/Quantity",
          "description": "What is the Unit for the Value/Quantity",
          "data_type": "text",
          "required": false,
          "display_field_as": "dropdown",
          "options":["Dollars", "Boxes", "Cans", "Blankets", "Tokens", "Passes", "Other (specify in Notes)"] ,
        },
        {
          "name_of_field": "Duration",
          "description": "How long did this event last in minutes?",
          "data_type": "number",
          "required": true,
          "display_field_as": "entry",
          "options": null,
        },
        {
          "name_of_field": "Notes",
          "description": "Notes on how the service event went.",
          "data_type": "text",
          "required": false,
          "display_field_as": "entry",
          "options": null,
        },
        {
          "name_of_field": "Status",
          "description": "What is the status of this event?",
          "data_type": "text",
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
         { // Example of a custom field
          "name_of_field": "Days of week with shelter",
          "description": "Days the recipient had shelter (not on the street)",
          "data_type": "text",
          "required": true,
          "display_field_as": "checkbox",
          "options": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        },
      ],
    }

```

<br>

## Specifications for the `service_entry_data` (in the `service_entries` table)

---

The service entry data, is what the Service Provider actually records, it is what frontend sends back.

Here we are splitting our data into default, and custom once more. However, this time inside of default/custom, it's just an object with **key** being the `name_of_field` specified by the model and the **value** being the collected data.

By sticking with just objects for the data, everything can be referenced with dot notation.

<br>

### Here is an example of what might be sent to the backend (based on the above schema):

```json

service_entry_data: {
  "default":
      {
        "Cost/Value": 5,
        "Duration": 30,
        "Notes": "Recipient reported being excited about a new job opportunity",
        "Status": "Completed",
        "Success Rating" : 4
      },
  "custom":
    {
      "Days of week with shelter": ["Monday", "Thursday", "Friday"]
    }
}

```
