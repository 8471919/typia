import typia from "../../../src";

import { SetUnion } from "../../structures/SetUnion";
import { _test_assertClone } from "../../internal/_test_assertClone";

export const test_assertClone_SetUnion = _test_assertClone(
    "SetUnion",
    SetUnion.generate,
    (input) => typia.assertClone(input),
    SetUnion.SPOILERS,
);
