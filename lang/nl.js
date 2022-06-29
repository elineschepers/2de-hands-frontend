import auth from "./nl-BE/auth";
import general from "./nl-BE/general";
import offers from './nl-BE/offers';
import fields from './nl-BE/fields';
import programs from './nl-BE/programs';
import courses from './nl-BE/courses';
import users from './nl-BE/users';
import nav from './nl-BE/nav';
import howto from './nl-BE/howto';
import language from './nl-BE/language.json';
import dashboard from './nl-BE/dashboard.json';

import { messages } from "vee-validate/dist/locale/nl.json";

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
