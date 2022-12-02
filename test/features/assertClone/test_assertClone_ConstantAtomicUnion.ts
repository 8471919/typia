import TSON from "../../../src";
import { ConstantAtomicUnion } from "../../structures/ConstantAtomicUnion";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_assertClone_ConstantAtomicUnion = _test_assertClone(
    "ConstantAtomicUnion",
    ConstantAtomicUnion.generate,
    (input) => TSON.assertClone(input),
    ConstantAtomicUnion.SPOILERS,
);
