import typia from "typia";

import { _test_json_application } from "../../../internal/_test_json_application";
import { CommentTagRange } from "../../../structures/CommentTagRange";

export const test_json_application_swagger_surplus_CommentTagRange =
  _test_json_application({
    purpose: "swagger",
    surplus: true,
    name: "CommentTagRange",
  })(typia.json.application<[CommentTagRange], "swagger", true>());
