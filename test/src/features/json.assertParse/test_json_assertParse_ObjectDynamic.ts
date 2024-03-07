import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { ObjectDynamic } from "../../structures/ObjectDynamic";

import { TypeGuardError } from "typia";

export const test_json_assertParse_ObjectDynamic = _test_json_assertParse(
  TypeGuardError,
)("ObjectDynamic")<ObjectDynamic>(ObjectDynamic)((input) =>
  typia.json.assertParse<ObjectDynamic>(input),
);
