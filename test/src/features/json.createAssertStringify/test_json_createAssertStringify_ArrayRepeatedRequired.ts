import typia from "typia";

import { _test_json_assertStringify } from "../../internal/_test_json_assertStringify";
import { ArrayRepeatedRequired } from "../../structures/ArrayRepeatedRequired";

import { TypeGuardError } from "typia";

export const test_json_createAssertStringify_ArrayRepeatedRequired =
  _test_json_assertStringify(TypeGuardError)(
    "ArrayRepeatedRequired",
  )<ArrayRepeatedRequired>(ArrayRepeatedRequired)(
    typia.json.createAssertStringify<ArrayRepeatedRequired>(),
  );
