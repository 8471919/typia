import TSON from "../../../src";
import { FunctionalProperty } from "../../structures/FunctionalProperty";
import { _test_assertEquals } from "../internal/_test_assertEquals";

export const test_createAssertEquals_FunctionalProperty = _test_assertEquals(
    "FunctionalProperty",
    FunctionalProperty.generate,
    TSON.createAssertEquals<FunctionalProperty>(),
);
