# Service Entry Type JSON Model Specifications: Service Type Model, and Service Entry Data

## Model Made By Program Manager (service_type_entry_model in the service_types table)

### service_type_entry_model in the service_types table

| data_type | Backend Expects | Description                                           |
| :-------- | :-------------- | :---------------------------------------------------- |
| `currency`| `number`        | For prices, etc.                                      |
| `quantity`| `number`        | For non price quantities, ex: number of blankets, etc.|
| `number`  | `number`        | For general number entry                              |
| `date`    | `string`        | For dates: Use Date Picker                            |
| `time`    | `string`        | For times: Use Time Picker                            |
| `text`    | `string`        | For free-form text entry                              |
| `boolean` | `boolean`       | For true/false options                                |

| display_field_as | Description                                                                 |
| :--------------- | :-------------------------------------------------------------------------- |
| `entry`          | Form field, use validation. If `date` or `time`, use corresponding pickers  |
| `dropdown`       | Should display `options` in a dropdown format                               |
| `checkbox`       | Should display `options` in a checkbox format                               |
| `radio`          | Should display `options` in a radio button format                           |


| Parameter        | Description                                                                 |
| :--------------- | :-------------------------------------------------------------------------- |
| `name_of_field`          | Form field, use validation. If `date` or `time`, use corresponding pickers  |
| `description`       | Should display `options` in a dropdown format                               |
| `data_type`       | Should display `options` in a checkbox format                               |
| `required`          | Should display `options` in a radio button format                           |
| `display_field_as`       | Should display `options` in a dropdown format                               |
| `allow_multi_select`       | Should display `options` in a checkbox format                               |
| `options`          | Should display `options` in a radio button format                           |


```json
service_type_entry_model: {
      "default": [
        {
          "name_of_field": "Cost/Value",
          "description": "Cost/Value in dollars/quantity",
          "data_type": "number",
          "required": false,
          "display_field_as": "entry",
          "allow_multi_select": false,
          "options": null,
        },
        {
          "name_of_field": "Duration",
          "description": "How long did this event last in minutes?",
          "data_type": "number",
          "required": true,
          "display_field_as": "text_entry",
          "allow_multi_select": false,
          "options": null,
        },
        {
          "name_of_field": "Notes",
          "description": "Notes on how this event.",
          "data_type": "test",
          "required": false,
          "display_field_as": "text_entry",
          "allow_multi_select": false,
          "options": null,
        },
        {
          "name_of_field": "Status",
          "description": "What is the status of this event?",
          "data_type": "string",
          "required": false,
          "display_field_as": "dropdown",
          "allow_multi_select": false,
          "options":["Completed", "Pending", "In Progress", "Follow Up Required"] ,
        },
        {
          "name_of_field": "Success Rating",
          "description": "How successful was this?",
          "data_type": "number",
          "required": true,
          "display_field_as": "radio",
          "allow_multi_select": false,
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
          "allow_multi_select": true,
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