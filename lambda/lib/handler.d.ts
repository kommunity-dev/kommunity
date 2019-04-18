import middy from '@middy/core';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
export declare const fetchUrl: APIGatewayProxyHandler;
export declare const submitResource: APIGatewayProxyHandler;
export declare const submitHandler: middy.IMiddy;
