import TSON from "../../../src";
import { MapSimple } from "../../structures/MapSimple";
import { _test_clone } from "../internal/_test_clone";

export const test_clone_MapSimple = _test_clone(
    "MapSimple",
    MapSimple.generate,
    (input) => TSON.clone(input),
);
