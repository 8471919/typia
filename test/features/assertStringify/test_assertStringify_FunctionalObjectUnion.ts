import TSON from "../../../src";
import { FunctionalObjectUnion } from "../../structures/FunctionalObjectUnion";
import { _test_assertStringify } from "../internal/_test_assertStringify";

export const test_assertStringify_FunctionalObjectUnion = _test_assertStringify(
    "FunctionalObjectUnion",
    FunctionalObjectUnion.generate,
    (input) => TSON.assertStringify(input),
    FunctionalObjectUnion.SPOILERS,
);
