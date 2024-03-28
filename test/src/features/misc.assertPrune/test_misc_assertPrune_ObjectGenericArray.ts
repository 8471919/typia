import typia from "typia";
import { TypeGuardError } from "typia";

import { _test_misc_assertPrune } from "../../internal/_test_misc_assertPrune";
import { ObjectGenericArray } from "../../structures/ObjectGenericArray";

export const test_misc_assertPrune_ObjectGenericArray = _test_misc_assertPrune(
  TypeGuardError,
)("ObjectGenericArray")<ObjectGenericArray>(ObjectGenericArray)((input) =>
  typia.misc.assertPrune<ObjectGenericArray>(input),
);
