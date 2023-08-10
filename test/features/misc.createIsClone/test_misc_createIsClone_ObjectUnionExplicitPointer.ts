import typia from "../../../src";
import { _test_misc_isClone } from "../../internal/_test_misc_isClone";
import { ObjectUnionExplicitPointer } from "../../structures/ObjectUnionExplicitPointer";

export const test_misc_isClone_ObjectUnionExplicitPointer =
    _test_misc_isClone<ObjectUnionExplicitPointer>(ObjectUnionExplicitPointer)(
        typia.misc.createIsClone<ObjectUnionExplicitPointer>(),
    );
