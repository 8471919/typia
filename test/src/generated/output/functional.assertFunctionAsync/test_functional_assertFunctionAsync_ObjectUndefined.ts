import typia from "typia";
import { TypeGuardError } from "typia";

import { _test_functional_assertFunctionAsync } from "../../../internal/_test_functional_assertFunctionAsync";
import { ObjectUndefined } from "../../../structures/ObjectUndefined";

export const test_functional_assertFunctionAsync_ObjectUndefined =
  _test_functional_assertFunctionAsync(TypeGuardError)("ObjectUndefined")(
    ObjectUndefined,
  )(
    (p: (input: ObjectUndefined) => Promise<ObjectUndefined>) =>
      async (input: ObjectUndefined): Promise<ObjectUndefined> => {
        const errorFactoryWrapper: (
          p: import("typia").TypeGuardError.IProps,
        ) => Error = (typia.functional.assertFunction as any).errorFactory;
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
        ): ObjectUndefined => {
          const __is = (input: any): input is ObjectUndefined => {
            const $io0 = (input: any): boolean =>
              "string" === typeof input.name &&
              (undefined === input.professor ||
                "string" === typeof input.professor ||
                ("number" === typeof input.professor &&
                  Number.isFinite(input.professor))) &&
              (undefined === input.classroom ||
                ("object" === typeof input.classroom &&
                  null !== input.classroom &&
                  $io1(input.classroom))) &&
              (undefined === input.grade ||
                ("number" === typeof input.grade &&
                  Number.isFinite(input.grade))) &&
              null !== input.nothing &&
              undefined === input.nothing &&
              true &&
              null !== input.never &&
              undefined === input.never;
            const $io1 = (input: any): boolean =>
              "string" === typeof input.id && "string" === typeof input.name;
            return (
              Array.isArray(input) &&
              input.every(
                (elem: any) =>
                  "object" === typeof elem && null !== elem && $io0(elem),
              )
            );
          };
          if (false === __is(input))
            ((
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): input is ObjectUndefined => {
              const $guard = (typia.functional.assertFunction as any).guard;
              const $ao0 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ("string" === typeof input.name ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".name",
                      expected: "string",
                      value: input.name,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.professor ||
                  "string" === typeof input.professor ||
                  ("number" === typeof input.professor &&
                    Number.isFinite(input.professor)) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".professor",
                      expected: "(number | string | undefined)",
                      value: input.professor,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.classroom ||
                  ((("object" === typeof input.classroom &&
                    null !== input.classroom) ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".classroom",
                        expected: "(ObjectUndefined.IClassroom | undefined)",
                        value: input.classroom,
                      },
                      errorFactory,
                    )) &&
                    $ao1(
                      input.classroom,
                      _path + ".classroom",
                      true && _exceptionable,
                    )) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".classroom",
                      expected: "(ObjectUndefined.IClassroom | undefined)",
                      value: input.classroom,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.grade ||
                  ("number" === typeof input.grade &&
                    Number.isFinite(input.grade)) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".grade",
                      expected: "(number | undefined)",
                      value: input.grade,
                    },
                    errorFactory,
                  )) &&
                (null !== input.nothing ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".nothing",
                      expected: "undefined",
                      value: input.nothing,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.nothing ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".nothing",
                      expected: "undefined",
                      value: input.nothing,
                    },
                    errorFactory,
                  )) &&
                true &&
                (null !== input.never ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".never",
                      expected: "undefined",
                      value: input.never,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.never ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".never",
                      expected: "undefined",
                      value: input.never,
                    },
                    errorFactory,
                  ));
              const $ao1 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ("string" === typeof input.id ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".id",
                      expected: "string",
                      value: input.id,
                    },
                    errorFactory,
                  )) &&
                ("string" === typeof input.name ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".name",
                      expected: "string",
                      value: input.name,
                    },
                    errorFactory,
                  ));
              return (
                ((Array.isArray(input) ||
                  $guard(
                    true,
                    {
                      path: _path + "",
                      expected: "ObjectUndefined",
                      value: input,
                    },
                    errorFactory,
                  )) &&
                  input.every(
                    (elem: any, _index1: number) =>
                      ((("object" === typeof elem && null !== elem) ||
                        $guard(
                          true,
                          {
                            path: _path + "[" + _index1 + "]",
                            expected: "ObjectUndefined.ILecture",
                            value: elem,
                          },
                          errorFactory,
                        )) &&
                        $ao0(elem, _path + "[" + _index1 + "]", true)) ||
                      $guard(
                        true,
                        {
                          path: _path + "[" + _index1 + "]",
                          expected: "ObjectUndefined.ILecture",
                          value: elem,
                        },
                        errorFactory,
                      ),
                  )) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "ObjectUndefined",
                    value: input,
                  },
                  errorFactory,
                )
              );
            })(input, "$input", true);
          return input;
        })(input);
        return ((
          input: any,
          errorFactory: (p: import("typia").TypeGuardError.IProps) => Error = (
            p: any,
          ) =>
            errorFactoryWrapper({
              ...p,
              path: p.path
                ? p.path.replace("$input", "$input.return")
                : undefined,
            }),
        ): ObjectUndefined => {
          const __is = (input: any): input is ObjectUndefined => {
            const $io0 = (input: any): boolean =>
              "string" === typeof input.name &&
              (undefined === input.professor ||
                "string" === typeof input.professor ||
                ("number" === typeof input.professor &&
                  Number.isFinite(input.professor))) &&
              (undefined === input.classroom ||
                ("object" === typeof input.classroom &&
                  null !== input.classroom &&
                  $io1(input.classroom))) &&
              (undefined === input.grade ||
                ("number" === typeof input.grade &&
                  Number.isFinite(input.grade))) &&
              null !== input.nothing &&
              undefined === input.nothing &&
              true &&
              null !== input.never &&
              undefined === input.never;
            const $io1 = (input: any): boolean =>
              "string" === typeof input.id && "string" === typeof input.name;
            return (
              Array.isArray(input) &&
              input.every(
                (elem: any) =>
                  "object" === typeof elem && null !== elem && $io0(elem),
              )
            );
          };
          if (false === __is(input))
            ((
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): input is ObjectUndefined => {
              const $guard = (typia.functional.assertFunction as any).guard;
              const $ao0 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ("string" === typeof input.name ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".name",
                      expected: "string",
                      value: input.name,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.professor ||
                  "string" === typeof input.professor ||
                  ("number" === typeof input.professor &&
                    Number.isFinite(input.professor)) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".professor",
                      expected: "(number | string | undefined)",
                      value: input.professor,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.classroom ||
                  ((("object" === typeof input.classroom &&
                    null !== input.classroom) ||
                    $guard(
                      _exceptionable,
                      {
                        path: _path + ".classroom",
                        expected: "(ObjectUndefined.IClassroom | undefined)",
                        value: input.classroom,
                      },
                      errorFactory,
                    )) &&
                    $ao1(
                      input.classroom,
                      _path + ".classroom",
                      true && _exceptionable,
                    )) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".classroom",
                      expected: "(ObjectUndefined.IClassroom | undefined)",
                      value: input.classroom,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.grade ||
                  ("number" === typeof input.grade &&
                    Number.isFinite(input.grade)) ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".grade",
                      expected: "(number | undefined)",
                      value: input.grade,
                    },
                    errorFactory,
                  )) &&
                (null !== input.nothing ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".nothing",
                      expected: "undefined",
                      value: input.nothing,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.nothing ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".nothing",
                      expected: "undefined",
                      value: input.nothing,
                    },
                    errorFactory,
                  )) &&
                true &&
                (null !== input.never ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".never",
                      expected: "undefined",
                      value: input.never,
                    },
                    errorFactory,
                  )) &&
                (undefined === input.never ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".never",
                      expected: "undefined",
                      value: input.never,
                    },
                    errorFactory,
                  ));
              const $ao1 = (
                input: any,
                _path: string,
                _exceptionable: boolean = true,
              ): boolean =>
                ("string" === typeof input.id ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".id",
                      expected: "string",
                      value: input.id,
                    },
                    errorFactory,
                  )) &&
                ("string" === typeof input.name ||
                  $guard(
                    _exceptionable,
                    {
                      path: _path + ".name",
                      expected: "string",
                      value: input.name,
                    },
                    errorFactory,
                  ));
              return (
                ((Array.isArray(input) ||
                  $guard(
                    true,
                    {
                      path: _path + "",
                      expected: "ObjectUndefined",
                      value: input,
                    },
                    errorFactory,
                  )) &&
                  input.every(
                    (elem: any, _index1: number) =>
                      ((("object" === typeof elem && null !== elem) ||
                        $guard(
                          true,
                          {
                            path: _path + "[" + _index1 + "]",
                            expected: "ObjectUndefined.ILecture",
                            value: elem,
                          },
                          errorFactory,
                        )) &&
                        $ao0(elem, _path + "[" + _index1 + "]", true)) ||
                      $guard(
                        true,
                        {
                          path: _path + "[" + _index1 + "]",
                          expected: "ObjectUndefined.ILecture",
                          value: elem,
                        },
                        errorFactory,
                      ),
                  )) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "ObjectUndefined",
                    value: input,
                  },
                  errorFactory,
                )
              );
            })(input, "$input", true);
          return input;
        })(await p(input));
      },
  );
