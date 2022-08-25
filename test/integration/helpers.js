import supertest from "supertest";
import chai from "chai";
import setupApp from "../../../src/app";

global.expect = chai.expect;

global.setupApp = setupApp;
global.supertest = supertest;
