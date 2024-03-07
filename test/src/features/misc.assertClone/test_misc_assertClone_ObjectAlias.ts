import typia from "typia";

import { _test_misc_assertClone } from "../../internal/_test_misc_assertClone";
import { ObjectAlias } from "../../structures/ObjectAlias";

import { TypeGuardError } from "typia";

export const test_misc_assertClone_ObjectAlias = _test_misc_assertClone(
  TypeGuardError,
)("ObjectAlias")<ObjectAlias>(ObjectAlias)((input) =>
  typia.misc.assertClone<ObjectAlias>(input),
);
