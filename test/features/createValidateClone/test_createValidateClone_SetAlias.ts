import typia from "../../../src";

import { SetAlias } from "../../structures/SetAlias";
import { _test_validateClone } from "../../internal/_test_validateClone";

export const test_createValidateClone_SetAlias = _test_validateClone(
    "SetAlias",
    SetAlias.generate,
    typia.createValidateClone<SetAlias>(),
    SetAlias.SPOILERS,
);
