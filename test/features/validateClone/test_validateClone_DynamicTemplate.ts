import typia from "../../../src";

import { DynamicTemplate } from "../../structures/DynamicTemplate";
import { _test_validateClone } from "../../internal/_test_validateClone";

export const test_validateClone_DynamicTemplate = _test_validateClone(
    "DynamicTemplate",
    DynamicTemplate.generate,
    (input) => typia.validateClone(input),
    DynamicTemplate.SPOILERS,
);
