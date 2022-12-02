import TSON from "../../../src";
import { DynamicComposite } from "../../structures/DynamicComposite";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_createAssertClone_DynamicComposite = _test_assertClone(
    "DynamicComposite",
    DynamicComposite.generate,
    TSON.createAssertClone<DynamicComposite>(),
    DynamicComposite.SPOILERS,
);
