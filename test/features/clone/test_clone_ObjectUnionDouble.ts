import TSON from "../../../src";
import { ObjectUnionDouble } from "../../structures/ObjectUnionDouble";
import { _test_clone } from "../internal/_test_clone";

export const test_clone_ObjectUnionDouble = _test_clone(
    "ObjectUnionDouble",
    ObjectUnionDouble.generate,
    (input) => TSON.clone(input),
);
