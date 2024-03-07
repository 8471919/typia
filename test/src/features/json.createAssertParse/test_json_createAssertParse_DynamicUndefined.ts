import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { DynamicUndefined } from "../../structures/DynamicUndefined";

import { TypeGuardError } from "typia";

export const test_json_createAssertParse_DynamicUndefined =
  _test_json_assertParse(TypeGuardError)("DynamicUndefined")<DynamicUndefined>(
    DynamicUndefined,
  )(typia.json.createAssertParse<DynamicUndefined>());
