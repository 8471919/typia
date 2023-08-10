import typia from "../../../src";
import { _test_assertEquals } from "../../internal/_test_assertEquals";
import { ObjectUnionExplicitPointer } from "../../structures/ObjectUnionExplicitPointer";

export const test_assertEquals_ObjectUnionExplicitPointer =
    _test_assertEquals<ObjectUnionExplicitPointer>(ObjectUnionExplicitPointer)(
        (input) => typia.assertEquals<ObjectUnionExplicitPointer>(input),
    );
