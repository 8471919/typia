import typia from "typia";

import { _test_json_assertParse } from "../../internal/_test_json_assertParse";
import { ObjectHierarchical } from "../../structures/ObjectHierarchical";

import { TypeGuardError } from "typia";

export const test_json_assertParse_ObjectHierarchical = _test_json_assertParse(
  TypeGuardError,
)("ObjectHierarchical")<ObjectHierarchical>(ObjectHierarchical)((input) =>
  typia.json.assertParse<ObjectHierarchical>(input),
);
