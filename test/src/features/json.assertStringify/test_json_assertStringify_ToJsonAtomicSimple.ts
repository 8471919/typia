import typia from "typia";

import { _test_json_assertStringify } from "../../internal/_test_json_assertStringify";
import { ToJsonAtomicSimple } from "../../structures/ToJsonAtomicSimple";

import { TypeGuardError } from "typia";

export const test_json_assertStringify_ToJsonAtomicSimple =
  _test_json_assertStringify(TypeGuardError)(
    "ToJsonAtomicSimple",
  )<ToJsonAtomicSimple>(ToJsonAtomicSimple)((input) =>
    typia.json.assertStringify<ToJsonAtomicSimple>(input),
  );
