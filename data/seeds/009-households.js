const faker = require('faker');

const getRand = (max) => {
  return Math.floor(Math.random() * max) + 1;
};

const households = [
  {
    household_id: '1b9efd46-0a29-4ed0-9646-4eb01fcb1a78',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 1,
  },
  {
    household_id: '457c9ef0-2386-40e1-9c32-c9b953f17da7',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 2,
  },
  {
    household_id: '354aabd3-492d-49e8-91f2-84844a827f1b',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 3,
  },
  {
    household_id: '47365bd0-aebb-48f9-bf78-5a6d3cbed720',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 4,
  },
  {
    household_id: 'b3fa1ae1-661e-45ff-8584-b0d1eeaf9e11',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 5,
  },
  {
    household_id: '64106c46-7b88-4642-8f38-a83bcec9d721',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 6,
  },
  {
    household_id: '840816ac-9e83-47aa-b6c5-f83b2b8f2361',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 7,
  },
  {
    household_id: 'cc95dd1a-e141-438f-b7a8-27f1bf356b0c',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 8,
  },
  {
    household_id: '33395e08-02bf-40db-97c5-a932b6769a11',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 9,
  },
  {
    household_id: 'ad8df54d-0c0d-4fb3-9ad8-bf50a64255ff',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 10,
  },
  {
    household_id: 'b1a24030-ec45-4a5e-b473-0526941a3669',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 11,
  },
  {
    household_id: 'b5cb24c0-21e5-43fc-ba22-52442bfe500a',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 12,
  },
  {
    household_id: '8261a2a0-275b-4ed5-9a4a-4bd9750ca215',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 13,
  },
  {
    household_id: 'f1c5bb6b-28bd-42b5-9b72-aa77faf3e433',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 14,
  },
  {
    household_id: 'bf5fb372-95dc-4776-8b11-514a4835ff53',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 15,
  },
  {
    household_id: 'c30eb05d-d4a1-49f8-a719-6448d6a7a15c',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 16,
  },
  {
    household_id: '9bf4f9fd-0d66-41f8-b933-019f660fd294',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 17,
  },
  {
    household_id: '693ee9fe-416c-4b0c-9d33-3f4f4ca787d7',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 18,
  },
  {
    household_id: 'd696b55e-fdf4-446f-a8a6-dcebaeaabef4',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 19,
  },
  {
    household_id: 'e9cde4e0-9816-4def-ba32-cb9f2e22ce12',
    household_name: faker.fake(`{{name.lastName}}`),
    household_size: Number(getRand(10)),
    household_income: Number(getRand(60000)),
    location_id: 20,
  },
];

exports.seed = function (knex) {
  return knex('households').insert(households);
};
