import typia from "../../../src";
import { _test_assert } from "../../internal/_test_assert";
import { ArrayRepeatedRequired } from "../../structures/ArrayRepeatedRequired";

export const test_assert_ArrayRepeatedRequired =
    _test_assert<ArrayRepeatedRequired>(ArrayRepeatedRequired)((input) =>
        typia.assert<ArrayRepeatedRequired>(input),
    );
