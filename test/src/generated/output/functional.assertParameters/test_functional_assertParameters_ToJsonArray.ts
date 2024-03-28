import typia from "typia";
import { TypeGuardError } from "typia";

import { _test_functional_assertParameters } from "../../../internal/_test_functional_assertParameters";
import { ToJsonArray } from "../../../structures/ToJsonArray";

export const test_functional_assertParameters_ToJsonArray =
  _test_functional_assertParameters(TypeGuardError)("ToJsonArray")(ToJsonArray)(
    (p: (input: ToJsonArray) => ToJsonArray) =>
      (input: ToJsonArray): ToJsonArray => {
        const errorFactoryWrapper: (
          p: import("typia").TypeGuardError.IProps,
        ) => Error = (typia.functional.assertParameters as any).errorFactory;
        ((
          input: any,
          errorFactory: (p: import("typia").TypeGuardError.IProps) => Error = (
            p: any,
          ) =>
            errorFactoryWrapper({
              ...p,
              path: p.path
                ? p.path.replace("$input", "$input.parameters[0]")
                : undefined,
            }),
        ): ToJsonArray => {
          const __is = (input: any): input is ToJsonArray => {
            const $io0 = (input: any): boolean =>
              "function" === typeof input.toJSON;
            const $io1 = (input: any): boolean =>
              "function" === typeof input.toJSON;
            const $io2 = (input: any): boolean =>
              "function" === typeof input.toJSON;
            const $io3 = (input: any): boolean =>
              "function" === typeof input.toJSON;
            return (
              Array.isArray(input) &&
              input.length === 4 &&
              "object" === typeof input[0] &&
              null !== input[0] &&
              $io0(input[0]) &&
              "object" === typeof input[1] &&
              null !== input[1] &&
              $io1(input[1]) &&
              "object" === typeof input[2] &&
              null !== input[2] &&
              $io2(input[2]) &&
              "object" === typeof input[3] &&
              null !== input[3] &&
              $io3(input[3])
            );
          };
          if (false === __is(input))
            ((
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): input is ToJsonArray => {
              const $guard = (typia.functional.assertParameters as any).guard;
              const $ao0 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                "function" === typeof input.toJSON ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".toJSON",
                    expected: "unknown",
                    value: input.toJSON,
                  },
                  errorFactory,
                );
              const $ao1 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                "function" === typeof input.toJSON ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".toJSON",
                    expected: "unknown",
                    value: input.toJSON,
                  },
                  errorFactory,
                );
              const $ao2 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                "function" === typeof input.toJSON ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".toJSON",
                    expected: "unknown",
                    value: input.toJSON,
                  },
                  errorFactory,
                );
              const $ao3 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                "function" === typeof input.toJSON ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".toJSON",
                    expected: "unknown",
                    value: input.toJSON,
                  },
                  errorFactory,
                );
              return (
                ((Array.isArray(input) ||
                  $guard(
                    true,
                    {
                      path: _path + "",
                      expected: "ToJsonArray",
                      value: input,
                    },
                    errorFactory,
                  )) &&
                  (input.length === 4 ||
                    $guard(
                      true,
                      {
                        path: _path + "",
                        expected:
                          "[ToJsonArray.IArray<boolean>, ToJsonArray.IArray<number>, ToJsonArray.IArray<string>, ToJsonArray.IArray<ToJsonArray.IObject>]",
                        value: input,
                      },
                      errorFactory,
                    )) &&
                  (((("object" === typeof input[0] && null !== input[0]) ||
                    $guard(
                      true,
                      {
                        path: _path + "[0]",
                        expected: "ToJsonArray.IArray<boolean>",
                        value: input[0],
                      },
                      errorFactory,
                    )) &&
                    $ao0(input[0], _path + "[0]", true)) ||
                    $guard(
                      true,
                      {
                        path: _path + "[0]",
                        expected: "ToJsonArray.IArray<boolean>",
                        value: input[0],
                      },
                      errorFactory,
                    )) &&
                  (((("object" === typeof input[1] && null !== input[1]) ||
                    $guard(
                      true,
                      {
                        path: _path + "[1]",
                        expected: "ToJsonArray.IArray<number>",
                        value: input[1],
                      },
                      errorFactory,
                    )) &&
                    $ao1(input[1], _path + "[1]", true)) ||
                    $guard(
                      true,
                      {
                        path: _path + "[1]",
                        expected: "ToJsonArray.IArray<number>",
                        value: input[1],
                      },
                      errorFactory,
                    )) &&
                  (((("object" === typeof input[2] && null !== input[2]) ||
                    $guard(
                      true,
                      {
                        path: _path + "[2]",
                        expected: "ToJsonArray.IArray<string>",
                        value: input[2],
                      },
                      errorFactory,
                    )) &&
                    $ao2(input[2], _path + "[2]", true)) ||
                    $guard(
                      true,
                      {
                        path: _path + "[2]",
                        expected: "ToJsonArray.IArray<string>",
                        value: input[2],
                      },
                      errorFactory,
                    )) &&
                  (((("object" === typeof input[3] && null !== input[3]) ||
                    $guard(
                      true,
                      {
                        path: _path + "[3]",
                        expected: "ToJsonArray.IArray<ToJsonArray.IObject>",
                        value: input[3],
                      },
                      errorFactory,
                    )) &&
                    $ao3(input[3], _path + "[3]", true)) ||
                    $guard(
                      true,
                      {
                        path: _path + "[3]",
                        expected: "ToJsonArray.IArray<ToJsonArray.IObject>",
                        value: input[3],
                      },
                      errorFactory,
                    ))) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "ToJsonArray",
                    value: input,
                  },
                  errorFactory,
                )
              );
            })(input, "$input", true);
          return input;
        })(input);
        return p(input);
      },
  );
