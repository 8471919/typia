import typia from "typia";

import { _test_misc_assertClone } from "../../internal/_test_misc_assertClone";
import { TypeTagDefault } from "../../structures/TypeTagDefault";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_misc_assertCloneCustom_TypeTagDefault =
  _test_misc_assertClone(CustomGuardError)("TypeTagDefault")<TypeTagDefault>(
    TypeTagDefault,
  )((input) =>
    typia.misc.assertClone<TypeTagDefault>(
      input,
      (p) => new CustomGuardError(p),
    ),
  );
