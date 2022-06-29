import auth from "./en-GB/auth";
import general from "./en-GB/general";
import offers from "./en-GB/offers";
import fields from './en-GB/fields';
import programs from './en-GB/programs';
import courses from './en-GB/courses';
import users from './en-GB/users';
import nav from './en-GB/nav';
import howto from './en-GB/howto';
import language from './en-GB/language.json';
import dashboard from './en-GB/dashboard.json';

import { messages } from "vee-validate/dist/locale/en.json";

export default {
  auth,
  general,
  offers,
  fields,
  programs,
  courses,
  nav,
  users,
  howto,
  language,
  dashboard,
  validations: {
    messages
  }
}

