import typia from "typia";

import { CustomGuardError } from "../../internal/CustomGuardError";
import { _test_functional_assertEqualsReturnAsync } from "../../internal/_test_functional_assertEqualsReturnAsync";
import { ArrayAtomicAlias } from "../../structures/ArrayAtomicAlias";

export const test_functional_assertEqualsReturnAsyncCustom_ArrayAtomicAlias =
  _test_functional_assertEqualsReturnAsync(CustomGuardError)(
    "ArrayAtomicAlias",
  )(ArrayAtomicAlias)(
    (p: (input: ArrayAtomicAlias) => Promise<ArrayAtomicAlias>) =>
      typia.functional.assertEqualsReturn(p, (p) => new CustomGuardError(p)),
  );
