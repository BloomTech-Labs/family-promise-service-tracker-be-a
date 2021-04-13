# API Endpoints
Server is deployed at: https://fp-service-tracker.herokuapp.com/
## Completed
### Users
Path|Method|Requirements|Authorization
---|-----|-------------|-----
/api/profiles| GET | none | none
/api/profiles/:id| GET | none | none
/api/profiles/:id| PUT | any desired edits as key:value json pair | Admin can edit role, name, avatarUrl of any user. Other users can edit their own name and avatarUrls, will receive 401 if they attempt to edit other fields or other users. 

#### Stubbed Endpoints
We were asked to stub some endpoints for user managementL 
Path|Method|Requirements|Authorization
---|-----|-------------|-----
/api/profiles|POST| {tbd} | Admin will receive stub response, Non-admin will receive 401
/api/profiles/:id| DELETE | none | Admin will receive stub response, Non-admin will receive 401

Profile object returned
```
{
    id: string,
    email: string,
    name: string,
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

Example JSON profile object for edit/create action:

```
{
    name: string,
    role: enum[administrator|program_manager|service_provider|unassigned],
    avatarUrl: string,
    programs: [array of program_ids]
}
```

## TODO
Route documentation

### Programs
Path|Method|Requirements|Authorization
---|-----|-------------|-----
/api/programs| GET | none | none
/api/programs/:id| GET | none | none
/api/programs|POST| {tbd}| admin
/api/programs/:id| PUT | id, any edits | admin or program manager of this program 
/api/programs/:id| DELETE | none | admin or program manager of this program 

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

### Services
Path|Method|Requirements|Authorization
---|-----|-------------|-----
/api/services| GET | none | none
/api/service/:id| GET | none | none
/api/service|POST| {tbd}| must be admin or program manager
/api/service/:id| PUT | id, any edits | must be admin or program manager of service_type
/api/service/:id| DELETE | none | must be admin or program manager of service_type

### Service Logs
Path|Method|Requirements|Authorization
---|-----|-------------|-----
/api/service_logs| GET | optional query params TBD | none
/api/service_logs/:id| GET | none | none
/api/service_logs|POST| {tbd}| Admin, PM, or Service Provider assigned to appropriate service_type 
/api/service_logs/:id| PUT | id, any edits | Admin, PM, or Service Provider assigned to appropriate service_type 
/api/service_logs/:id| DELETE | none | Admin, PM, or Service Provider assigned to appropriate service_type 

### Recipients
Path|Method|Requirements|Authorization
---|-----|-------------|-----
/api/recipients| GET | none | none
/api/recipients/:id| GET | none | none
/api/recipients|POST| {tbd}| none
/api/recipients/:id| PUT | id, any edits | none
/api/recipients/:id| DELETE | none | none
