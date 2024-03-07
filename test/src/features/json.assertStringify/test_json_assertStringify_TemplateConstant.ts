import typia from "typia";

import { _test_json_assertStringify } from "../../internal/_test_json_assertStringify";
import { TemplateConstant } from "../../structures/TemplateConstant";

import { TypeGuardError } from "typia";

export const test_json_assertStringify_TemplateConstant =
  _test_json_assertStringify(TypeGuardError)(
    "TemplateConstant",
  )<TemplateConstant>(TemplateConstant)((input) =>
    typia.json.assertStringify<TemplateConstant>(input),
  );
