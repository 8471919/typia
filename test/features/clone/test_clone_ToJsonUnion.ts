import TSON from "../../../src";
import { ToJsonUnion } from "../../structures/ToJsonUnion";
import { _test_clone } from "../internal/_test_clone";

export const test_clone_ToJsonUnion = _test_clone(
    "ToJsonUnion",
    ToJsonUnion.generate,
    (input) => TSON.clone(input),
);
