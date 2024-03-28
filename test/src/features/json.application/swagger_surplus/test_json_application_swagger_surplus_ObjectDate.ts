import typia from "typia";

import { _test_json_application } from "../../../internal/_test_json_application";
import { ObjectDate } from "../../../structures/ObjectDate";

export const test_json_application_swagger_surplus_ObjectDate =
  _test_json_application({
    purpose: "swagger",
    surplus: true,
    name: "ObjectDate",
  })(typia.json.application<[ObjectDate], "swagger", true>());
