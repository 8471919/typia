import typia from "typia";

import { _test_misc_assertPrune } from "../../internal/_test_misc_assertPrune";
import { TypeTagType } from "../../structures/TypeTagType";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_misc_assertPruneCustom_TypeTagType = _test_misc_assertPrune(
  CustomGuardError,
)("TypeTagType")<TypeTagType>(TypeTagType)((input) =>
  typia.misc.assertPrune<TypeTagType>(input, (p) => new CustomGuardError(p)),
);
