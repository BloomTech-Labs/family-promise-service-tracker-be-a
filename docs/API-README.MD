# API Endpoints

Watch this for a backend walkthrough: https://www.loom.com/share/4b2fbefcfe2a4d5d8e3dad2c20cb57d4 
latest DB schema: https://dbdesigner.page.link/TkqhaqDpvCjd4dDJ8
M Habermas, 24/08/2021

Server is deployed at: https://fp-service-tracker.herokuapp.com/

All endpoints except for index require a valid Okta token for authorization. The authorization specifications for each table
below refer to authorization beyond having a valid token.

# Completed

## Users / Service Providers

| Path                                    | Method  | Requirements                                                         | Authorization                                                                                                                                                                                 |
| --------------------------------------- | ------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api/providers                          | GET     | none                                                                 |                                                                                                                                                                                               |
| /api/providers/:id                      | GET     | none                                                                 |                                                                                                                                                                                               |
| PUTs not working ~~/api/providers/:id~~ | ~~PUT~~ | ~~any desired edits as key:value json pair. See below for details.~~ | ~~Admin can edit role, name, avatarUrl, and programs of any user. Other users can edit their own name and avatarUrls, will receive 401 if they attempt to edit other fields or other users.~~ |
| /api/providers                          | POST    | STUBBED RESPONSE                                                     | Admin will receive stub response, Non-admin will receive 401                                                                                                                                  |
| /api/providers/:id                      | DELETE  | STUBBED RESPONSE                                                     | Admin will receive stub response, Non-admin will receive 401                                                                                                                                  |

We were asked to hold off on allowing access to Create/Delete functions, so those are stubbed responses for now.

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	"provider_id": string (okta id),
	"provider_role_id": integer
	"employee_id": string,
	"provider_first_name": string,
	"provider_last_name": string,
	"provider_email": string,
	"provider_phone_number": string,
	"provider_avatar_url": string,
	"provider_is_active": boolean,
	"created_at": DateTime string,
	"updated_at": DateTime string,
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	"provider_role_id": integer
	"employee_id": string,
	"provider_first_name": string,
	"provider_last_name": string,
	"provider_email": string,
	"provider_phone_number": string,
	"provider_avatar_url": string,
	"provider_is_active": boolean,
}
```

</details>


## Programs

| Path                   | Method     | Requirements                     | Authorization                                |
| ---------------------- | ---------- | -------------------------------- | -------------------------------------------- |
| /api/programs          | GET        | none                             | none                                         |
| /api/programs/:id      | GET        | none                             | none                                         |
| ~~/api/programs/name~~ | ~~POST~~   | ~~name~~                         | ~~none~~                                     |
| ~~/api/programs~~      | ~~POST~~   | ~~name, type, description~~      | ~~admin~~                                    |
| ~~/api/programs/:id~~  | ~~PUT~~    | ~~any edits as key:value pairs~~ | ~~admin or program manager of this program~~ |
| ~~/api/programs/:id~~  | ~~DELETE~~ | ~~none~~                         | ~~admin or program manager of this program~~ |

program object returned on GET requests:

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	"program_id": integer
        "program_name": string,
        "program_description": string,
        "program_is_active": boolean
        "created_at": DateTime string,
        "updated_at": DateTime string
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	"program_id": integer
        "program_name": string,
        "program_description": string,
}
```

</details>

## Statuses

| Path              | Method | Requirements              | Authorization |
| ----------------- | ------ | ------------------------- | ------------- |
| /api/statuses     | GET    | none                      | none          |
| /api/status/:id   | GET    | none                      | none          |
| /api/status       | POST   | name                      | admin         |
| /api/programs/:id | PUT    | desired edit as key:value | admin         |
| /api/programs/:id | DELETE | none                      | admin         |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	"status_id": integer
        "status_name": string,
        "status_description": string,
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
        "status_name": string,
        "status_description": string,
}
```

</details>

## Service Types

| Path                       | Method     | Requirements         | Authorization                                                                           |
| -------------------------- | ---------- | -------------------- | --------------------------------------------------------------------------------------- |
| /api/service_types         | GET        | none                 | none                                                                                    |
| /api/service_types/:id     | GET        | none                 | none                                                                                    |
| ~~/api/service_types~~     | ~~POST~~   | ~~name, program_id~~ | ~~must be admin or a program manager of the program associated with this service type~~ |
| ~~/api/service_types/:id~~ | ~~PUT~~    | ~~id, any edits~~    | ~~must be admin or a program manager of the program associated with this service type~~ |
| ~~/api/service_types/:id~~ | ~~DELETE~~ | ~~none~~             | ~~must be admin or a program manager of the program associated with this service type~~ |

**_Please refer to [API-README-SERVICE-ENTRIES.md](API-README-SERVICE-ENTRIES.md)_**

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>

Service Type object returned on GET requests:

```
{
    service_type_id:int,
    program_id:int,
    service_type_name:string,
    service_type_description:string,
    service_type_entry_model: Object containing the default and custom field information
    service_providers: array of profile objects
    created_at:datetime string,
    updated_at:datetime string,
}
```

To create a service type:
service_type_id: 999 is currently a "model" that can be used as a base for new service types, if needed.

```JS
NOT WORKING
// {
//     "service_type_name":"Bus Fare",
//     "service_type_description":"Weekly bus fare allowance",
//     service_type_entry_model: Object containing the default and custom field information,
//     "program_id":3,
// }
```

~~To edit a service type, provide only the fields you wish to change:~~

```JS
NOT WORKING

// {
//     "name":"Bus Fare"
// }
```

~~To edit the associated service providers, provide the full list of service providers you would like associated. As with assigning programs to users on the /profiles routes, the service providers array you provide will overwrite any existing associations.~~

~~E.g. To remove all associations, provide an empty array:~~

```JS
NOT WORKING
// {
//     "service_providers": []
// }
```

~~If user X was already assigned to this service type, and you want to also add user Y, you must include both X and Y in the service providers field:~~

```JS
// NOT WORKING
// {
//     "service_providers": ["x","y"]
// }
```

## Service Entries

**Getting all entries sends too much data to FE**

| Path                         | Method     | Requirements                                             | Authorization                                                                                  |
| ---------------------------- | ---------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| /api/service_entries         | GET        | none                                                     | none                                                                                           |
| /api/service_entries/:id     | GET        | none                                                     | none                                                                                           |
| ~~/api/service_entries~~     | ~~POST~~   | ~~service_type_id, provided_at, status_id, provider_id~~ | ~~must be admin or a program manager or a service provider associated with this service type~~ |
| ~~/api/service_entries/:id~~ | ~~PUT~~    | ~~id, any edits~~                                        | ~~must be admin or a program manager or a service provider associated with this service type~~ |
| ~~/api/service_entries/:id~~ | ~~DELETE~~ | ~~none~~                                                 | ~~must be admin or a program manager or a service provider associated with this service type~~ |

**_Please refer to [API-README-SERVICE-ENTRIES.md](API-README-SERVICE-ENTRIES.md)_**

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>
```JS
{
    service_entry_id: uuid,
    service_type_id: int,
    location_id: int
    service_date: datestring,
    service_time: datestring,
    service_entry_data: refer to readme,
    created_at:datetime string,
    updated_at:datetime string,
    recipient: recipient object,
    service_type: service_type object,
}
```

## Recipients

All routes work with /api/recipient or /api/recipients

| Path                     | Method     | Requirements                                                 | Authorization                                |
| ------------------------ | ---------- | ------------------------------------------------------------ | -------------------------------------------- |
| /api/recipients          | GET        | none                                                         | none                                         |
| /api/recipients/veterans | GET        | none                                                         | none                                         |
| ~~/api/recipient/:id~~   | ~~GET~~    | ~~none~~                                                     | ~~none~~                                     |
| ~~/api/recipient~~       | ~~POST~~   | ~~first_name, last_name, age, household_id, veteran_status~~ | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/recipient/:id~~   | ~~PUT~~    | ~~desired edit as key:value~~                                | ~~admin, Program Manager~~                   |
| ~~/api/recipient/:id~~   | ~~DELETE~~ | ~~none~~                                                     | ~~admin~~                                    |

Recipient object returned on GET requests:

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	"recipient_id": uuid,
        "recipient_first_name": string,
        "recipient_middle_name": string,
        "recipient_last_name": string,
        "recipient_is_active": boolean,
        "recipient_date_of_birth": Date string,
        "recipient_veteran_status": boolean,
        "has_disability": boolean,
        "has_valid_ssi": boolean,
        "has_valid_medicare_card": boolean,
        "recipient_notes": string,
        "household_id": uuid,
        "gender_id": 19,
        "race_id": 1,
        "ethnicity_id": 1,
        "created_at": DateTime string,
        "updated_at": DateTime string,
        "gender": "Prefer not to say",
        "race": "White",
        "ethnicity": "Hispanic/Latino"
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
        "recipient_first_name": string,
        "recipient_middle_name": string,
        "recipient_last_name": string,
        "recipient_is_active": boolean,
        "recipient_date_of_birth": Date string,
        "recipient_veteran_status": boolean,
        "has_disability": boolean,
        "has_valid_ssi": boolean,
        "has_valid_medicare_card": boolean,
        "recipient_notes": string,
        "household_id": uuid,
        "gender_id": 19,
        "race_id": 1,
        "ethnicity_id": 1,
```

</details>

## Households

All routes work with /api/household or /api/households

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/households        | GET        | none                          | none                                         |
| ~~/api/household/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/household~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/household/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/household/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

Recipient object returned on GET requests:

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	"household_id": uuid,
        "location_id": uuid,
        "household_name": string,
        "household_size": integer,
        "household_monthly_income": decimal,
        "is_unstable": boolean,
        "created_at": DateTime string,
        "updated_at": DateTime string
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	"location_id": uuid,
        "household_name": string,
        "household_size": integer,
        "household_monthly_income": decimal,
        "is_unstable": boolean,
}
```

</details>

## Metrics

All routes work with /api/metric or /api/metrics

| Path                                           | Method | Requirements | Authorization |
| ---------------------------------------------- | ------ | ------------ | ------------- |
| /api/metrics/recipientscount                   | GET    | none         | none          |
| /api/metrics/servicescount                     | GET    | none         | none          |
| HARDCODED DATE ~~/api/metrics/recipientsweek~~ | GET    | none         | none          |
| HARDCODED DATE ~~/api/metrics/servicesweek~~   | GET    | none         | none          |

Metric object returned on GET requests:

```
{
    count:int
}
```
