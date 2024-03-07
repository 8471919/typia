import typia from "typia";

import { _test_misc_assertPrune } from "../../internal/_test_misc_assertPrune";
import { ArrayUnion } from "../../structures/ArrayUnion";

import { TypeGuardError } from "typia";

export const test_misc_assertPrune_ArrayUnion = _test_misc_assertPrune(
  TypeGuardError,
)("ArrayUnion")<ArrayUnion>(ArrayUnion)((input) =>
  typia.misc.assertPrune<ArrayUnion>(input),
);
