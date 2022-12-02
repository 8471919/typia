import TSON from "../../../src";
import { ToJsonUnion } from "../../structures/ToJsonUnion";
import { _test_isClone } from "../internal/_test_isClone";

export const test_isClone_ToJsonUnion = _test_isClone(
    "ToJsonUnion",
    ToJsonUnion.generate,
    (input) => TSON.isClone(input),
);
