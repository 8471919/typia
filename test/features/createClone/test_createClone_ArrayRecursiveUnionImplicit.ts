import TSON from "../../../src";
import { ArrayRecursiveUnionImplicit } from "../../structures/ArrayRecursiveUnionImplicit";
import { _test_clone } from "../internal/_test_clone";

export const test_createClone_ArrayRecursiveUnionImplicit = _test_clone(
    "ArrayRecursiveUnionImplicit",
    ArrayRecursiveUnionImplicit.generate,
    TSON.createClone<ArrayRecursiveUnionImplicit>(),
);
