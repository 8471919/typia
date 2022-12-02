import TSON from "../../../src";
import { FunctionalProperty } from "../../structures/FunctionalProperty";
import { _test_assertStringify } from "../internal/_test_assertStringify";

export const test_createAssertStringify_FunctionalProperty =
    _test_assertStringify(
        "FunctionalProperty",
        FunctionalProperty.generate,
        TSON.createAssertStringify<FunctionalProperty>(),
        FunctionalProperty.SPOILERS,
    );
