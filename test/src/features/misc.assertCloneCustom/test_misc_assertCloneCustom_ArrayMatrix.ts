import typia from "typia";

import { _test_misc_assertClone } from "../../internal/_test_misc_assertClone";
import { ArrayMatrix } from "../../structures/ArrayMatrix";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_misc_assertCloneCustom_ArrayMatrix = _test_misc_assertClone(
  CustomGuardError,
)("ArrayMatrix")<ArrayMatrix>(ArrayMatrix)((input) =>
  typia.misc.assertClone<ArrayMatrix>(input, (p) => new CustomGuardError(p)),
);
