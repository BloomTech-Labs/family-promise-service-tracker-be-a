const service_entries = [
  {
    service_entry_id: '5eefe344-263f-4248-8a8b-a005fde89fc7',
    service_type_id: 1,
    location_id: 1,
    service_date: '2021-01-20',
    service_time: '00:00:00.0000000',
    service_entry_data: {
      "duration": 1,
      "notes": null,
      "status": "completed"
    }
  },
];

exports.seed = function (knex) {
  return knex('service_entries').insert(service_entries);
};
