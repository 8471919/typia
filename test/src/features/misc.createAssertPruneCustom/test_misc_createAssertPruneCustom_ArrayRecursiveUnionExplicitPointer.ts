import typia from "typia";

import { _test_misc_assertPrune } from "../../internal/_test_misc_assertPrune";
import { ArrayRecursiveUnionExplicitPointer } from "../../structures/ArrayRecursiveUnionExplicitPointer";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_misc_createAssertPruneCustom_ArrayRecursiveUnionExplicitPointer =
  _test_misc_assertPrune(CustomGuardError)(
    "ArrayRecursiveUnionExplicitPointer",
  )<ArrayRecursiveUnionExplicitPointer>(ArrayRecursiveUnionExplicitPointer)(
    typia.misc.createAssertPrune<ArrayRecursiveUnionExplicitPointer>(
      (p) => new CustomGuardError(p),
    ),
  );
