import TSON from "../../../src";
import { DynamicConstant } from "../../structures/DynamicConstant";
import { _test_assertEquals } from "../internal/_test_assertEquals";

export const test_createAssertEquals_DynamicConstant = _test_assertEquals(
    "DynamicConstant",
    DynamicConstant.generate,
    TSON.createAssertEquals<DynamicConstant>(),
);
