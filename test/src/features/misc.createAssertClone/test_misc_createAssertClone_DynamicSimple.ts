import typia from "typia";

import { _test_misc_assertClone } from "../../internal/_test_misc_assertClone";
import { DynamicSimple } from "../../structures/DynamicSimple";

import { TypeGuardError } from "typia";

export const test_misc_createAssertClone_DynamicSimple = _test_misc_assertClone(
  TypeGuardError,
)("DynamicSimple")<DynamicSimple>(DynamicSimple)(
  typia.misc.createAssertClone<DynamicSimple>(),
);
