// feel free to parse or simplify as you see fit
// list found the internet https://www.alchemer.com/resources/blog/how-to-write-survey-gender-questions/
const genders = [
  {
    gender: 'Female',
  },
  {
    gender: 'Male',
  },
  {
    gender: 'Transgender: M to F',
  },
  {
    gender: 'Transgender: F to M',
  },
  {
    gender: 'Gender fluid',
  },
  {
    gender: 'Agender',
  },
  {
    gender: 'Androgynous',
  },
  {
    gender: 'Bi-gender',
  },
  {
    gender: 'Non-binary',
  },
  {
    gender: 'Demi-boy',
  },
  {
    gender: 'Demi-girl',
  },
  {
    gender: 'Genderqueer',
  },
  {
    gender: 'Gender nonconforming',
  },
  {
    gender: 'Tri-gender',
  },
  {
    gender: 'All genders',
  },
  {
    gender: 'In the middle of boy and girl',
  },
  {
    gender: 'Intersex',
  },
  {
    gender: 'Not sure',
  },
  {
    gender: 'Prefer not to say',
  },
  {
    gender: 'Other',
  },
];

exports.seed = function (knex) {
  return knex('genders').insert(genders);
};
