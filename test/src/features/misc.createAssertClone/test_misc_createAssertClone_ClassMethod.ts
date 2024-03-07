import typia from "typia";

import { _test_misc_assertClone } from "../../internal/_test_misc_assertClone";
import { ClassMethod } from "../../structures/ClassMethod";

import { TypeGuardError } from "typia";

export const test_misc_createAssertClone_ClassMethod = _test_misc_assertClone(
  TypeGuardError,
)("ClassMethod")<ClassMethod>(ClassMethod)(
  typia.misc.createAssertClone<ClassMethod>(),
);
