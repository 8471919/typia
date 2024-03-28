import typia from "typia";

import { _test_json_application } from "../../../internal/_test_json_application";
import { TypeTagCustom } from "../../../structures/TypeTagCustom";

export const test_json_application_swagger_standard_TypeTagCustom =
  _test_json_application({
    purpose: "swagger",
    surplus: false,
    name: "TypeTagCustom",
  })(typia.json.application<[TypeTagCustom], "swagger", false>());
