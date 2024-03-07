import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { ObjectUndefined } from "../../structures/ObjectUndefined";

import { TypeGuardError } from "typia";

export const test_json_assertParse_ObjectUndefined = _test_json_assertParse(
  TypeGuardError,
)("ObjectUndefined")<ObjectUndefined>(ObjectUndefined)((input) =>
  typia.json.assertParse<ObjectUndefined>(input),
);
