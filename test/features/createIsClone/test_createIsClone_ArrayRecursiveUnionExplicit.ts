import TSON from "../../../src";
import { ArrayRecursiveUnionExplicit } from "../../structures/ArrayRecursiveUnionExplicit";
import { _test_isClone } from "../internal/_test_isClone";

export const test_createIsClone_ArrayRecursiveUnionExplicit = _test_isClone(
    "ArrayRecursiveUnionExplicit",
    ArrayRecursiveUnionExplicit.generate,
    TSON.createIsClone<ArrayRecursiveUnionExplicit>(),
    ArrayRecursiveUnionExplicit.SPOILERS,
);
