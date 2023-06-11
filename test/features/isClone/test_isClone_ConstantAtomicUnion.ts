import typia from "../../../src";

import { ConstantAtomicUnion } from "../../structures/ConstantAtomicUnion";
import { _test_isClone } from "../../internal/_test_isClone";

export const test_isClone_ConstantAtomicUnion = _test_isClone(
    "ConstantAtomicUnion",
    ConstantAtomicUnion.generate,
    (input) => typia.isClone(input),
    ConstantAtomicUnion.SPOILERS,
);
