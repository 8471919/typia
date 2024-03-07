import typia from "typia";

import { _test_misc_assertPrune } from "../../internal/_test_misc_assertPrune";
import { ClassMethod } from "../../structures/ClassMethod";

import { TypeGuardError } from "typia";

export const test_misc_createAssertPrune_ClassMethod = _test_misc_assertPrune(
  TypeGuardError,
)("ClassMethod")<ClassMethod>(ClassMethod)(
  typia.misc.createAssertPrune<ClassMethod>(),
);
