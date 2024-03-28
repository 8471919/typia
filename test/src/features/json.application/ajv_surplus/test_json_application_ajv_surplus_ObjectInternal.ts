import typia from "typia";

import { _test_json_application } from "../../../internal/_test_json_application";
import { ObjectInternal } from "../../../structures/ObjectInternal";

export const test_json_application_ajv_surplus_ObjectInternal =
  _test_json_application({
    purpose: "ajv",
    surplus: true,
    name: "ObjectInternal",
  })(typia.json.application<[ObjectInternal], "ajv", true>());
