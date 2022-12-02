import TSON from "../../../src";
import { DynamicTree } from "../../structures/DynamicTree";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_assertClone_DynamicTree = _test_assertClone(
    "DynamicTree",
    DynamicTree.generate,
    (input) => TSON.assertClone(input),
    DynamicTree.SPOILERS,
);
