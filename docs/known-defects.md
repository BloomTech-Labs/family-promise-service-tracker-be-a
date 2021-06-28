# Known Issues

As of end of Labs 35:

- Due to change of backend schema, Many/Most model functions still do not work properly. They still have to be re-written and updated.

- Check the API-README, did strikethrough on endpoints not working properly.

- Get All Service Entries model needs to be paired down. With 500 service entries, backend sends over 70k lines back currently. Reduce redundant data sent to frontend.

- When creating endpoint/model for updating service_entry_type_models, should do a transaction to edit the service_entry_data. So that names continue to match, also to add fields. Shouldn't delete fields that already exist if possible, better to update names if possible, don't want to lose data.

- Recommendations:

  - Start fixing the endpoints/models in the API Readme.
  - Work on new endpoints needed.
  - Work on needed middleware
  - Work on tests

- More questions? Feel free to reach out to me on Lambda's slack (@Jay Ponce de Leon) or github (@jaypdl)

<br>
<br>

As of May 28, last day of Labs34 cohort:

- Service Entries authorization is not yet implemented - need to add middleware to restrict create/edit/delete of service_entries to authorized users (Administrator, Program Manager, Service Provider). You can utilize the test user with "unassigned" role to test against.
