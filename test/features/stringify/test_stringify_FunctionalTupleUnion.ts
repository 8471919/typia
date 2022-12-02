import TSON from "../../../src";
import { FunctionalTupleUnion } from "../../structures/FunctionalTupleUnion";
import { _test_stringify } from "../internal/_test_stringify";

export const test_stringify_FunctionalTupleUnion = _test_stringify(
    "FunctionalTupleUnion",
    FunctionalTupleUnion.generate,
    (input) => TSON.stringify(input),
);
