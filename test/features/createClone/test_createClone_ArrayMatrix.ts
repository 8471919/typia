import TSON from "../../../src";
import { ArrayMatrix } from "../../structures/ArrayMatrix";
import { _test_clone } from "../internal/_test_clone";

export const test_createClone_ArrayMatrix = _test_clone(
    "ArrayMatrix",
    ArrayMatrix.generate,
    TSON.createClone<ArrayMatrix>(),
);
