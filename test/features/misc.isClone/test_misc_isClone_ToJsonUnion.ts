import typia from "../../../src";
import { _test_misc_isClone } from "../../internal/_test_misc_isClone";
import { ToJsonUnion } from "../../structures/ToJsonUnion";

export const test_misc_isClone_ToJsonUnion = _test_misc_isClone<ToJsonUnion>(
    ToJsonUnion,
)((input) => typia.misc.isClone<ToJsonUnion>(input));
