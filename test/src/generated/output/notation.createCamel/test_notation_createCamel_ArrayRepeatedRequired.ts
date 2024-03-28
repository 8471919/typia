import typia from "typia";

import { _test_notation_validateGeneral } from "../../../internal/_test_notation_validateGeneral";
import { ArrayRepeatedRequired } from "../../../structures/ArrayRepeatedRequired";

export const test_notation_createValidateCamel_ArrayRepeatedRequired =
  _test_notation_validateGeneral(
    "ArrayRepeatedRequired",
  )<ArrayRepeatedRequired>(ArrayRepeatedRequired)<
    typia.CamelCase<ArrayRepeatedRequired>
  >({
    convert: (
      input: any,
    ): typia.IValidation<typia.CamelCase<ArrayRepeatedRequired>> => {
      const validate = (
        input: any,
      ): typia.IValidation<ArrayRepeatedRequired> => {
        const errors = [] as any[];
        const __is = (input: any): input is ArrayRepeatedRequired => {
          const $ia0 = (input: any): any =>
            input.every(
              (elem: any) =>
                null !== elem &&
                undefined !== elem &&
                ("string" === typeof elem ||
                  ("number" === typeof elem && Number.isFinite(elem)) ||
                  (Array.isArray(elem) && ($ia0(elem) || false))),
            );
          return (
            null !== input &&
            undefined !== input &&
            ("string" === typeof input ||
              ("number" === typeof input && Number.isFinite(input)) ||
              (Array.isArray(input) && ($ia0(input) || false)))
          );
        };
        if (false === __is(input)) {
          const $report = (typia.notations.createValidateCamel as any).report(
            errors,
          );
          ((
            input: any,
            _path: string,
            _exceptionable: boolean = true,
          ): input is ArrayRepeatedRequired => {
            const $va0 = (
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): any =>
              input
                .map(
                  (elem: any, _index1: number) =>
                    (null !== elem ||
                      $report(_exceptionable, {
                        path: _path + "[" + _index1 + "]",
                        expected:
                          "(Array<ArrayRepeatedRequired> | number | string)",
                        value: elem,
                      })) &&
                    (undefined !== elem ||
                      $report(_exceptionable, {
                        path: _path + "[" + _index1 + "]",
                        expected:
                          "(Array<ArrayRepeatedRequired> | number | string)",
                        value: elem,
                      })) &&
                    ("string" === typeof elem ||
                      ("number" === typeof elem && Number.isFinite(elem)) ||
                      ((Array.isArray(elem) ||
                        $report(_exceptionable, {
                          path: _path + "[" + _index1 + "]",
                          expected:
                            "(Array<ArrayRepeatedRequired> | number | string)",
                          value: elem,
                        })) &&
                        ($va0(
                          elem,
                          _path + "[" + _index1 + "]",
                          true && _exceptionable,
                        ) ||
                          $report(_exceptionable, {
                            path: _path + "[" + _index1 + "]",
                            expected: "Array<ArrayRepeatedRequired>",
                            value: elem,
                          }))) ||
                      $report(_exceptionable, {
                        path: _path + "[" + _index1 + "]",
                        expected:
                          "(Array<ArrayRepeatedRequired> | number | string)",
                        value: elem,
                      })),
                )
                .every((flag: boolean) => flag);
            return (
              (null !== input ||
                $report(true, {
                  path: _path + "",
                  expected: "(Array<ArrayRepeatedRequired> | number | string)",
                  value: input,
                })) &&
              (undefined !== input ||
                $report(true, {
                  path: _path + "",
                  expected: "(Array<ArrayRepeatedRequired> | number | string)",
                  value: input,
                })) &&
              ("string" === typeof input ||
                ("number" === typeof input && Number.isFinite(input)) ||
                ((Array.isArray(input) ||
                  $report(true, {
                    path: _path + "",
                    expected:
                      "(Array<ArrayRepeatedRequired> | number | string)",
                    value: input,
                  })) &&
                  ($va0(input, _path + "", true && _exceptionable) ||
                    $report(_exceptionable, {
                      path: _path + "",
                      expected: "Array<ArrayRepeatedRequired>",
                      value: input,
                    }))) ||
                $report(true, {
                  path: _path + "",
                  expected: "(Array<ArrayRepeatedRequired> | number | string)",
                  value: input,
                }))
            );
          })(input, "$input", true);
        }
        const success = 0 === errors.length;
        return {
          success,
          errors,
          data: success ? input : undefined,
        } as any;
      };
      const general = (
        input: ArrayRepeatedRequired,
      ): typia.CamelCase<ArrayRepeatedRequired> => {
        const $ia0 = (input: any): any =>
          input.every(
            (elem: any) =>
              null !== elem &&
              undefined !== elem &&
              ("string" === typeof elem ||
                "number" === typeof elem ||
                (Array.isArray(elem) && ($ia0(elem) || false))),
          );
        const $cp0 = (input: any) => $ca0(input);
        const $ca0 = (input: any): any =>
          input.map((elem: any) =>
            Array.isArray(elem) ? $cp0(elem) : (elem as any),
          );
        return Array.isArray(input) ? $cp0(input) : (input as any);
      };
      const output = validate(input) as any;
      if (output.success) output.data = general(input);
      return output;
    },
    assert: (
      input: any,
      errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error,
    ): typia.CamelCase<ArrayRepeatedRequired> => {
      const __is = (
        input: any,
      ): input is typia.CamelCase<ArrayRepeatedRequired> => {
        const $ia0 = (input: any): any =>
          input.every(
            (elem: any) =>
              null !== elem &&
              undefined !== elem &&
              ("string" === typeof elem ||
                ("number" === typeof elem && Number.isFinite(elem)) ||
                (Array.isArray(elem) && ($ia0(elem) || false))),
          );
        return (
          null !== input &&
          undefined !== input &&
          ("string" === typeof input ||
            ("number" === typeof input && Number.isFinite(input)) ||
            (Array.isArray(input) && ($ia0(input) || false)))
        );
      };
      if (false === __is(input))
        ((
          input: any,
          _path: string,
          _exceptionable: boolean = true,
        ): input is typia.CamelCase<ArrayRepeatedRequired> => {
          const $guard = (typia.createAssert as any).guard;
          const $aa0 = (
            input: any,
            _path: string,
            _exceptionable: boolean = true,
          ): any =>
            input.every(
              (elem: any, _index1: number) =>
                (null !== elem ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + "[" + _index1 + "]",
                      expected:
                        "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                      value: elem,
                    },
                    errorFactory,
                  )) &&
                (undefined !== elem ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + "[" + _index1 + "]",
                      expected:
                        "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                      value: elem,
                    },
                    errorFactory,
                  )) &&
                ("string" === typeof elem ||
                  ("number" === typeof elem && Number.isFinite(elem)) ||
                  ((Array.isArray(elem) ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + "[" + _index1 + "]",
                        expected:
                          "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                        value: elem,
                      },
                      errorFactory,
                    )) &&
                    ($aa0(
                      elem,
                      _path + "[" + _index1 + "]",
                      true && _exceptionable,
                    ) ||
                      $guard(
                        _exceptionable,
                        {
                          path: _path + "[" + _index1 + "]",
                          expected:
                            "Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]>",
                          value: elem,
                        },
                        errorFactory,
                      ))) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + "[" + _index1 + "]",
                      expected:
                        "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                      value: elem,
                    },
                    errorFactory,
                  )),
            );
          return (
            (null !== input ||
              $guard(
                true,
                {
                  path: _path + "",
                  expected:
                    "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                  value: input,
                },
                errorFactory,
              )) &&
            (undefined !== input ||
              $guard(
                true,
                {
                  path: _path + "",
                  expected:
                    "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                  value: input,
                },
                errorFactory,
              )) &&
            ("string" === typeof input ||
              ("number" === typeof input && Number.isFinite(input)) ||
              ((Array.isArray(input) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected:
                      "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                    value: input,
                  },
                  errorFactory,
                )) &&
                ($aa0(input, _path + "", true && _exceptionable) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + "",
                      expected:
                        "Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]>",
                      value: input,
                    },
                    errorFactory,
                  ))) ||
              $guard(
                true,
                {
                  path: _path + "",
                  expected:
                    "(Array<string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | number | (string | ... 1 more ... | (string | ... 1 more ... | (string | ... 1 more ... | ...)[])[])[])[])[])[])[])[])[])[])[]> | number | string)",
                  value: input,
                },
                errorFactory,
              ))
          );
        })(input, "$input", true);
      return input;
    },
  });
