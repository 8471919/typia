import TSON from "../../../src";
import { ArrayRecursive } from "../../structures/ArrayRecursive";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_createAssertClone_ArrayRecursive = _test_assertClone(
    "ArrayRecursive",
    ArrayRecursive.generate,
    TSON.createAssertClone<ArrayRecursive>(),
    ArrayRecursive.SPOILERS,
);
