const knex = require('../../data/db-config');

const isAssignedToProgram = async (provider, program) => {
  const providerToProgram = await knex('provider_programs')
    .where('program_id', program)
    .andWhere('provider_id', provider);
  return providerToProgram.length > 0;
};

const getServiceTypeProgramIds = async (serviceTypeId) => {
  //service type id from req.params!!
  //service type program ids
  let serviceTypeProgramIds = [];
  //service type programs array
  const serviceTypeProgramObjs = await knex('service_type_programs')
    .where('service_type_id', serviceTypeId)
    .select('program_id');
  serviceTypeProgramObjs.map((stpObj) => {
    serviceTypeProgramIds.push(stpObj.program_id);
  });
  return serviceTypeProgramIds;
};

const getProviderProgramIds = async (providerId) => {
  //provider objs array
  const providerProgramObjs = await knex('provider_programs')
    .where('provider_id', providerId)
    .select('program_id');
  //provider program ids array
  const providerProgramIds = [];
  providerProgramObjs.map((ppObj) => {
    providerProgramIds.push(ppObj.program_id);
  });
  return providerProgramIds;
};

module.exports = {
  isAssignedToProgram,
  getServiceTypeProgramIds,
  getProviderProgramIds,
};
