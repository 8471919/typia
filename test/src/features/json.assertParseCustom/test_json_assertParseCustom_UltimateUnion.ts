import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { UltimateUnion } from "../../structures/UltimateUnion";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_json_assertParseCustom_UltimateUnion = _test_json_assertParse(
  CustomGuardError,
)("UltimateUnion")<UltimateUnion>(UltimateUnion)((input) =>
  typia.json.assertParse<UltimateUnion>(input, (p) => new CustomGuardError(p)),
);
