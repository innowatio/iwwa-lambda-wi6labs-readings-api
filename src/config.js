import dotenv from "dotenv";

dotenv.config();

export const KINESIS_STREAM_NAME = process.env.KINESIS_STREAM_NAME || "KINESIS_STREAM_NAME";
export const KINESIS_PARTITION_KEY = "iwwa-lambda-wi6labs-readings-api";
export const NODE_ENV = process.env.NODE_ENV;
