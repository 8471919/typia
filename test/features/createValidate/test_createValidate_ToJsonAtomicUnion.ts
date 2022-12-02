import TSON from "../../../src";
import { ToJsonAtomicUnion } from "../../structures/ToJsonAtomicUnion";
import { _test_validate } from "../internal/_test_validate";

export const test_createValidate_ToJsonAtomicUnion = _test_validate(
    "ToJsonAtomicUnion",
    ToJsonAtomicUnion.generate,
    TSON.createValidate<ToJsonAtomicUnion>(),
);
