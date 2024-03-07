import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { ObjectSimple } from "../../structures/ObjectSimple";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_json_assertParseCustom_ObjectSimple = _test_json_assertParse(
  CustomGuardError,
)("ObjectSimple")<ObjectSimple>(ObjectSimple)((input) =>
  typia.json.assertParse<ObjectSimple>(input, (p) => new CustomGuardError(p)),
);
