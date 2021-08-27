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
	"service_type_id": integer,
        "service_type_name": string,
        "service_type_description": string,
        "service_type_is_active": boolean,
	"created_at": DateTime string,
        "updated_at": DateTime string
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
        "service_type_name": string,
        "service_type_description": string,
        "service_type_is_active": boolean,
}
```

</details>


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
	"service_entry_id": uuid
        "primary_provider_id": okta string,
        "primary_recipient_id": uuid,
        "service_type_program_id": integer,
        "apply_service_to_household": boolean,
        "service_date": Date string,
        "service_time": Time string,
        "service_duration": Time string,
        "service_value": decimal,
        "service_quantity": integer,
        "service_entry_notes": string,
        "service_entry_data": jsonb object, *
        "service_unit_id": integer,
        "status_id": integer,
        "service_rating_id": integer,
        "location_id": uuid,
        "created_at": DateTime string,
        "updated_at": DateTime string
        "recipient": {
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
		"gender_id": integer,
		"race_id": integer,
		"ethnicity_id": integer,
		"created_at": DateTime string,
		"updated_at": DateTime string,
        },
        "service_type": {
		"service_type_id": integer,
		"service_type_name": string,
		"service_type_description": string,
		"service_type_is_active": boolean,
		"service_type_entry_model": {
			"custom": []
		},
		"created_at": DateTime string,
		"updated_at": DateTime string
        },
        "location": {
		"location_id": uuid,
		"location_type_id": uuid,
		"location_name":string,
		"location_description": string,
		"address": string,
		"address_line2": string,
		"city": string,
		"state": string,
		"zip": string,
		"county": string,
		"country": string,
		"location_longitude": decimal,
		"location_latitude": decimal,
		"created_at": DateTime string,
		"updated_at": DateTime string
        },
        "provider": {
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
        },
        "program": {
            	"program_id": integer,
          	"program_name": string,
         	"program_description": string,
         	"program_is_active": true,
		"created_at": DateTime string,
		"updated_at": DateTime string
        },
        "status": {
            	"status_id": integer
        	"status_name": string,
        	"status_description": string,
        }
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	"primary_provider_id": okta string,
        "primary_recipient_id": uuid,
        "service_type_program_id": integer,
        "apply_service_to_household": boolean,
        "service_date": Date string,
        "service_time": Time string,
        "service_duration": Time string,
        "service_value": decimal,
        "service_quantity": integer,
        "service_entry_notes": string,
        "service_entry_data": jsonb object, *
        "service_unit_id": integer,
        "status_id": integer,
        "service_rating_id": integer,
        "location_id": uuid
}
```

</details>

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

## Locations

All routes work with /api/location or /api/locations

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/location        | GET        | none                          | none                                         |
| ~~/api/location/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/location~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/location/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/location/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
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
        "status_description": string
}
```

</details>  
  
## Genders

All routes work with /api/gender or /api/genders

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/gender        | GET        | none                          | none                                         |
| ~~/api/gender/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/gender~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/gender/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/gender/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>

## Ethnicities

All routes work with /api/ethnicity or /api/ethnicities

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/ethnicity        | GET        | none                          | none                                         |
| ~~/api/ethnicity/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/ethnicity~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/ethnicity/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/ethnicity/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>

## Races

All routes work with /api/race or /api/races

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/race        | GET        | none                          | none                                         |
| ~~/api/race/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/race~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/race/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/race/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>


## Phone Numbers

All routes work with /api/phoneNumber or /api/phoneNumbers

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/phoneNumber        | GET        | none                          | none                                         |
| ~~/api/phoneNumber/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/phoneNumber~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/phoneNumber/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/phoneNumber/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>


## Email Addresses

All routes work with /api/emailAddress or /api/emailAddresses

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/emailAddress        | GET        | none                          | none                                         |
| ~~/api/emailAddress/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/emailAddress~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/emailAddress/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/emailAddress/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>


## Location Types

All routes work with /api/locationType or /api/locationTypes

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/locationType        | GET        | none                          | none                                         |
| ~~/api/locationType/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/locationType~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/locationType/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/locationType/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>


## Service Units

All routes work with /api/serviceUnit or /api/serviceUnits

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/serviceUnit        | GET        | none                          | none                                         |
| ~~/api/serviceUnit/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/serviceUnit~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/serviceUnit/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/serviceUnit/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>


## Service Ratings

All routes work with /api/serviceRating or /api/serviceRatings

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/serviceRating        | GET        | none                          | none                                         |
| ~~/api/serviceRating/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/serviceRating~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/serviceRating/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/serviceRating/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>


## Provider Roles

All routes work with /api/providerRole or /api/providerRoles

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/providerRole        | GET        | none                          | none                                         |
| ~~/api/providerRole/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/providerRole~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/providerRole/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/providerRole/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
}
```

</details>


## Service Type Programs

All routes work with /api/serviceTypePrograms or /api/serviceTypeProgram

| Path                   | Method     | Requirements                  | Authorization                                |
| ---------------------- | ---------- | ----------------------------- | -------------------------------------------- |
| /api/serviceTypeProgram        | GET        | none                          | none                                         |
| ~~/api/serviceTypeProgram/:id~~ | ~~GET~~    | ~~none~~                      | none                                         |
| ~~/api/serviceTypeProgram~~     | ~~POST~~   |                               | ~~admin, Program Manager, Service Provider~~ |
| ~~/api/serviceTypeProgram/:id~~ | ~~PUT~~    | ~~desired edit as key:value~~ | ~~admin, Program Manager~~                   |
| ~~/api/serviceTypeProgram/:id~~ | ~~DELETE~~ | ~~none~~                      | ~~admin~~                                    |

<details>
<summary>What You Should Receive (GET)</summary>

```JSON

{
	
}
```

</details>

<details>
<summary>What You Should Send (POST)</summary>

```JSON

{
	
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
