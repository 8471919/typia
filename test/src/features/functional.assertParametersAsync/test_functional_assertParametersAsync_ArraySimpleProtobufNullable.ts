import typia from "typia";
import { TypeGuardError } from "typia";

import { _test_functional_assertParametersAsync } from "../../internal/_test_functional_assertParametersAsync";
import { ArraySimpleProtobufNullable } from "../../structures/ArraySimpleProtobufNullable";

export const test_functional_assertParametersAsync_ArraySimpleProtobufNullable =
  _test_functional_assertParametersAsync(TypeGuardError)(
    "ArraySimpleProtobufNullable",
  )(ArraySimpleProtobufNullable)(
    (
      p: (
        input: ArraySimpleProtobufNullable,
      ) => Promise<ArraySimpleProtobufNullable>,
    ) => typia.functional.assertParameters(p),
  );
