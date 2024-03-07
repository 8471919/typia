import typia from "typia";

import { _test_http_assertQuery } from "../../internal/_test_http_assertQuery";
import { ObjectHttpNullable } from "../../structures/ObjectHttpNullable";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_http_createAssertQueryCustom_ObjectHttpNullable =
  _test_http_assertQuery(CustomGuardError)(
    "ObjectHttpNullable",
  )<ObjectHttpNullable>(ObjectHttpNullable)(
    typia.http.createAssertQuery<ObjectHttpNullable>(
      (p) => new CustomGuardError(p),
    ),
  );
