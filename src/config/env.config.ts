import dotenv from 'dotenv';
import Joi from 'joi';
import * as path from 'path';
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// define validation for all the env vars
const envVarsSchema = Joi.object({
  PORT: Joi.number().default(5000),
  RECORD_ENV: Joi.boolean(),
  TEST_ENV: Joi.boolean(),
  SECRET: Joi.string(),
  REACT_APP_BUILD_ENV: Joi.string().default('development'),
  // PUBLIC_URL: Joi.string().default('http://localhost:3000'),
  GOOGLE_KEY: Joi.string(),
  GOOGLE_OAUTH_CLIENTID: Joi.string(),
  GOOGLE_OAUTH_SECRET: Joi.string(),
  GOOGLE_APPLICATION_CREDENTIALS: Joi.string(),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  recordEnv: envVars.RECORD_ENV,
  testEnv: envVars.TEST_ENV,
  secret: envVars.SECRET,
	reactAppBuildEnv: envVars.REACT_APP_BUILD_ENV,
  // publicUrl: envVars.PUBLIC_URL,
  googleKey: envVars.GOOGLE_KEY,
  googleOauthClientId: envVars.GOOGLE_OAUTH_CLIENTID,
  googleOauthSecret: envVars.GOOGLE_OAUTH_SECRET,
  googleApplicationCredentials: envVars.GOOGLE_APPLICATION_CREDENTIALS,
	port: envVars.PORT, 
};

export const envConfig = config;
