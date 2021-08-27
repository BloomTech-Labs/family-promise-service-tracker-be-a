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
<summary>What You Should Send(POST)</summary>

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



Provider object:

```
{
    provider_id: string (okta id),
    role: string,
    provider_first_name: string,
    provider_last_name: string,
    provider_email: string,
    provider_phone_number: string,
    employee_id: string
    provider_avatar_url: string,
    created_at: DateTime string,
    updated_at, DateTime string,
    programs: [
      {
        program_id: string,
        program_name: string,
        program_description: string,
        created_at: DateTime string,
        updated_at, DateTime string
      },
      {
        program_id: string,
        program_name: string,
        program_description: string,
        created_at: DateTime string,
        updated_at, DateTime string
      }
    ]
}
```

<!--

THESE DO NOT CURRENTLY WORK

For Editing a given profile, including their assigned programs, submit only the fields that you would like to change.
The programs field accepts an array of program IDs.

Change name and avatar:

```
{
    "firstName": "Nancy",
    "avatarUrl": "http://example.com/path/to/img/.jpg"
}
```

Change role and progams:

```
{
    "role":"Program Manager",
    "programs":["program_id_4","program_id_8"]
}
```

Note that if you include a programs field it will overwrite any prior assignments.
To delete all assignments, include an empty array:

```
{
    "programs": []
}
```

If user was already assigned to program x, and you want to also add them to program y,
you must include both x and y in the programs field:

```
{
    "programs": ["x","y"]
}
``` -->

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
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>

<details>
<summary>What You Should Send(POST)</summary>

```JSON

{
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>
```
{
    program_id:int,
    program_name:string,
    program_description:string,
    created_at: DateTime string,
    updated_at, DateTime string,
    users:[array of provider objects]
}
```

<!-- To create or edit program:

```
{
    rogram_name:string,
    program_description:string,
}
```

ID will be generated automatically for new programs, should be included in URL param for edits.

According to UX docs, assigning Users to Programs will happen on the user object and not on Program object. -->

## Statuses

Statuses are now part of the new service_entry_data JSON,
status can be accessed using knex query for JSON as noted in [API-REAMDME-SERVICE-ENTRIES.md](API-README-SERVICE-ENTRIES.md)

<!-- | Path              | Method | Requirements              | Authorization |
| ----------------- | ------ | ------------------------- | ------------- |
| /api/statuses     | GET    | none                      | none          |
| /api/status/:id   | GET    | none                      | none          |
| /api/status       | POST   | name                      | admin         |
| /api/programs/:id | PUT    | desired edit as key:value | admin         |
| /api/programs/:id | DELETE | none                      | admin         |

Status object returned on GET requests:

```
{
    id:int,
    name:string,
    created_at:datetime string,
    updated_at:datetime string
}
```

To create or edit a status:

```
{
    "name":"Desired change as a string"
}
``` -->

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
<summary>What You Should Send(POST)</summary>

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
<summary>What You Should Send(POST)</summary>

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
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>

<details>
<summary>What You Should Send(POST)</summary>

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
    recipient_id:uuid,
    recipient_first_name:string,
    recipient_middle_name: string,
    recipient_last_name:string,
    recipient_date_of_birth:string,
    recipient_veteran_status:boolean,
    household_id:uuid,
    gender_id: int,
    race_id: int,
    ethnicity_id: int,
    created_at:datetime string,
    updated_at:datetime string
    race:string,
    gender: string,
    ethnicity:string,
    household_name: string,
    zip: string
}
```

<!-- To create or edit a recipient:

```
{
    "first_name":"Desired change as a string",
    "last_name":"Desired change as a string",
    "age":"Desired change as an integer",
    "race":"Desired change as an enum",
    "ethnicity":"Desired change as an enum",
    "gender":"Desired change as an enum",
    "veteran_status":"Desired change as a boolean"
}
``` -->

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
	message: 'TEST',
	newUser: {
		err: 'TEST2',
	}
}
```

</details>

<details>
<summary>What You Should Send(POST)</summary>

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
    household_id:int,
    household_name: string
    household_size:int,
    household_income: int,
    location_id: int,
    created_at:datetime string,
    updated_at:datetime string
}
```

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
