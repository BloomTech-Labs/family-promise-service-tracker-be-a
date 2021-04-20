# API Endpoints

Server is deployed at: https://fp-service-tracker.herokuapp.com/

All endpoints except for index require a valid Okta token for authorization. The authorization specfications for each table below refer to authorization beyond having a valid token.

# Completed

## Users

| Path              | Method | Requirements                                                    | Authorization                                                                                                                                                                             |
| ----------------- | ------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api/profiles     | GET    | none                                                            | none                                                                                                                                                                                      |
| /api/profiles/:id | GET    | none                                                            | none                                                                                                                                                                                      |
| /api/profiles/:id | PUT    | any desired edits as key:value json pair. See below for details | Admin can edit role, name, avatarUrl, and programs of any user. Other users can edit their own name and avatarUrls, will receive 401 if they attempt to edit other fields or other users. |
| /api/profiles     | POST   | STUBBED RESPONSE                                                | Admin will receive stub response, Non-admin will receive 401                                                                                                                              |
| /api/profiles/:id | DELETE | STUBBED RESPONSE                                                | Admin will receive stub response, Non-admin will receive 401                                                                                                                              |

We were asked to hold off on allowing access to Create/Delete functions, so those are stubbed responses for now.

Profile object:

```
{
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    avatarUrl: string,
    role: string,
    created_at: DateTime string,
    updated_at, DateTime string,
    programs: [
      {
        id: string,
        name: string,
        type: string,
        description: string
      },
      {
        id: string,
        name: string,
        type: string,
        description: string
      }
    ]
}
```

For Editing a given profile, including their assigned programs, submit only the fields that you would like to change. The programs field accepts an array of program IDs.

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
    "role":"program_manager",
    "programs":["program_id_4","program_id_8"]
}
```

Note that if you include a programs field it will overwrite any prior assignments. To delete all assignments, include an empty array:

```
{
    "programs": []
}
```

If user was already assigned to program x, and you want to also add them to program y, you must include both x and y in the programs field:

```
{
    "programs": ["x","y"]
}
```

## Programs

| Path               | Method | Requirements                 | Authorization                            |
| ------------------ | ------ | ---------------------------- | ---------------------------------------- |
| /api/programs      | GET    | none                         | none                                     |
| /api/programs/:id  | GET    | none                         | none                                     |
| /api/programs/name | POST   | name                         | none                                     |
| /api/programs/type | POST   | type                         | none                                     |
| /api/programs      | POST   | name, type, description      | admin                                    |
| /api/programs/:id  | PUT    | any edits as key:value pairs | admin or program manager of this program |
| /api/programs/:id  | DELETE | none                         | admin or program manager of this program |

program object returned on GET requests:

```
{
    id:int,
    name:string,
    type:string,
    description:string,
    program_managers:[array of profile objects]
}
```

To create or edit program:

```
{
    name:string,
    type:string,
    description:string,
}
```

ID will be generated automatically for new programs, should be included in URL param for edits.

According to UX docs, assigning Users to Programs will happen on the user object and not on Program object.

## Statuses

All routes work with /api/status or /api/statuses

| Path              | Method | Requirements              | Authorization |
| ----------------- | ------ | ------------------------- | ------------- |
| /api/statuses     | GET    | none                      | none          |
| /api/status/:id   | GET    | none                      | none          |
| /api/status       | POST   | name                      | admin         |
| /api/programs/:id | PUT    | desired edit as key:value | admin         |
| /api/programs/:id | DELETE | none                      | admin         |

status object returned on GET requests:

```
{
    id:int,
    name:string,
    created_at:datetime,
    updated_at:datetime
}
```

To create or edit a status:

```
{
    "name":"Desired change as string"
}
```

## Service Types

| Path                  | Method | Requirements  | Authorization |
| --------------------- | ------ | ------------- | ------------- |
| /api/service_types    | GET    | none          | none          |
| /api/service_type/:id | GET    | none          | none          |
| /api/service          | POST   | {tbd}         | must be admin |
| /api/service/:id      | PUT    | id, any edits | must be admin |
| /api/service/:id      | DELETE | none          | must be admin |

Service Type object returned on GET requests:

```
{
    id:int,
    name:string,
    description: string,
    program_id: int,
    service_providers: array of profile objects
    created_at:datetime string,
    updated_at:datetime string,
}
```

To create a service type:

```
{
    "name":"Bus Fare",
    "description":"Weekly bus fare allowance",
    "program_id":3,
    "service_providers":["provider_id_1","provider_id_2"]
}
```

To edit a service type, provide only the fields you wish to change:

```
{
    "name":"Bus Fare"
}
```

To edit the associated service providers, provide the full list of service providers you would like associated. As with assigning programs to users on the /profiles routes, the service providers array you provide will overwrite any existing associations.

E.g. To remove all associations, provide an empty array:

```
{
    "service_providers": []
}
```

If user X was already assigned to this service type, and you want to also add user Y, you must include both X and Y in the service providers field:

```
{
    "service_providers": ["x","y"]
}
```

## TODO

Route documentation

### Service Logs

| Path                  | Method | Requirements              | Authorization                                                       |
| --------------------- | ------ | ------------------------- | ------------------------------------------------------------------- |
| /api/service_logs     | GET    | optional query params TBD | none                                                                |
| /api/service_logs/:id | GET    | none                      | none                                                                |
| /api/service_logs     | POST   | {tbd}                     | Admin, PM, or Service Provider assigned to appropriate service_type |
| /api/service_logs/:id | PUT    | id, any edits             | Admin, PM, or Service Provider assigned to appropriate service_type |
| /api/service_logs/:id | DELETE | none                      | Admin, PM, or Service Provider assigned to appropriate service_type |

### Recipients

| Path                | Method | Requirements  | Authorization |
| ------------------- | ------ | ------------- | ------------- |
| /api/recipients     | GET    | none          | none          |
| /api/recipients/:id | GET    | none          | none          |
| /api/recipients     | POST   | {tbd}         | none          |
| /api/recipients/:id | PUT    | id, any edits | none          |
| /api/recipients/:id | DELETE | none          | none          |
