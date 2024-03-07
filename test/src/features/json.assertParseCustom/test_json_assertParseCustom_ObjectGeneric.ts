import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { ObjectGeneric } from "../../structures/ObjectGeneric";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_json_assertParseCustom_ObjectGeneric = _test_json_assertParse(
  CustomGuardError,
)("ObjectGeneric")<ObjectGeneric>(ObjectGeneric)((input) =>
  typia.json.assertParse<ObjectGeneric>(input, (p) => new CustomGuardError(p)),
);
