import typia from "typia";

import { CustomGuardError } from "../../internal/CustomGuardError";
import { _test_json_assertStringify } from "../../internal/_test_json_assertStringify";
import { ToJsonAtomicSimple } from "../../structures/ToJsonAtomicSimple";

export const test_json_assertStringifyCustom_ToJsonAtomicSimple =
  _test_json_assertStringify(CustomGuardError)(
    "ToJsonAtomicSimple",
  )<ToJsonAtomicSimple>(ToJsonAtomicSimple)((input) =>
    typia.json.assertStringify<ToJsonAtomicSimple>(
      input,
      (p) => new CustomGuardError(p),
    ),
  );
