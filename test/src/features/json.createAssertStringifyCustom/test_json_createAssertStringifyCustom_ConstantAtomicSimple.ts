import typia from "typia";

import { CustomGuardError } from "../../internal/CustomGuardError";
import { _test_json_assertStringify } from "../../internal/_test_json_assertStringify";
import { ConstantAtomicSimple } from "../../structures/ConstantAtomicSimple";

export const test_json_createAssertStringifyCustom_ConstantAtomicSimple =
  _test_json_assertStringify(CustomGuardError)(
    "ConstantAtomicSimple",
  )<ConstantAtomicSimple>(ConstantAtomicSimple)(
    typia.json.createAssertStringify<ConstantAtomicSimple>(
      (p) => new CustomGuardError(p),
    ),
  );
