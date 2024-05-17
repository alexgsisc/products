import 'dotenv/config';

import * as joi from 'joi';

interface IEnvs {
    PORT: number
}


// TODO: validate  squema whit joi
const envsSchema = joi.object({
    PORT: joi.number().required(),
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: IEnvs = value;

export const envs = {
    port: envVars.PORT,
}