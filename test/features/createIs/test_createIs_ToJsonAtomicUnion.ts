import TSON from "../../../src";
import { ToJsonAtomicUnion } from "../../structures/ToJsonAtomicUnion";
import { _test_is } from "../internal/_test_is";

export const test_createIs_ToJsonAtomicUnion = _test_is(
    "ToJsonAtomicUnion",
    ToJsonAtomicUnion.generate,
    TSON.createIs<ToJsonAtomicUnion>(),
);
