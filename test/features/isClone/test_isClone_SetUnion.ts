import TSON from "../../../src";
import { SetUnion } from "../../structures/SetUnion";
import { _test_isClone } from "../internal/_test_isClone";

export const test_isClone_SetUnion = _test_isClone(
    "SetUnion",
    SetUnion.generate,
    (input) => TSON.isClone(input),
    SetUnion.SPOILERS,
);
