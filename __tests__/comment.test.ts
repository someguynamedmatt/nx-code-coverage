/* eslint-disable filenames/match-regex */
import {BuildCommentInputs} from '../src/interfaces'
import {buildComment} from '../src/comment'

describe('comment tests', () => {
  let mockDetails = ''
  beforeEach(() => {
    mockDetails =
      '------------------------------------|---------|----------|---------|---------|-------------------\nFile                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s \n------------------------------------|---------|----------|---------|---------|-------------------\nAll files                           | statements |   96.42 | statements |       60 | branches |   96.66 | functions |   96.59 | lines |                   | low \n------------------------------------|---------|----------|---------|---------|-------------------\n'
  })
  describe('buildComment', () => {
    let hideCoverageReports = false
    let hideUnchanged = false

    //     test('when results empty then empty code coverage comment', () => {
    //       const input: BuildCommentInputs = {
    //         results: [],
    //         hideCoverageReports,
    //         hideUnchanged
    //       }
    //       const actual = buildComment(input)
    //       expect(actual).toStrictEqual('Code Coverage:<p></p><table><tbody></tbody></table>')
    //     })
    //     test('when result base/diff null then no diff in code coverage comment', async () => {
    //       const input: BuildCommentInputs = {
    //         results: [
    //           {
    //             app: 'app A',
    //             coverage: 50,
    //             base: null,
    //             diff: null,
    //             details: mockDetails
    //           }
    //         ],
    //         hideCoverageReports,
    //         hideUnchanged
    //       }
    //       const actual = buildComment(input)
    //         expect(actual.replace(/\s+/, '')).toContain(
    // 'Code Coverage:<p></p><table><tbody><tr><th>app A</th><th>50.00%</th></tr><details><summary>Coverage Report</summary><table><tbody><tr><th>File</th><th> % Stmts </th><th> % Branch </th><th> % Funcs </th><th> % Lines </th><th> Uncovered Line #s </th></tr><tr><td>All&nbsp;files</td><td>&nbsp;  96.42 </td><td>&nbsp;60 </td><td>&nbsp;  96.66 </td><td>&nbsp;  96.59 </td><td>&nbsp;</td></tr></tbody></table></details> <br/></tbody></table>'
    //       )
    //     })

    describe('when hiding coverage reports', () => {
      beforeEach(() => {
        hideCoverageReports = true
      })
      describe('when not hiding unchanged', () => {
        beforeEach(() => {
          hideUnchanged = false
        })
        test('when result diff is 0 then 0 diff in code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: 50,
                base: 50,
                diff: 0,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
        test('when result diff is negative then negative diff in code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: 50,
                base: 75,
                diff: -25,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
        test('when result diff is positive then positive diff in code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: 50,
                base: 25,
                diff: 25,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
        test('when result coverage is undefined then unknown diff in code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: undefined,
                base: null,
                diff: null,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })

        test('when all results in one then return as expected', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app diff 0',
                coverage: 50,
                base: 50,
                diff: 0,
                details: mockDetails
              },
              {
                app: 'app diff -',
                coverage: 50,
                base: 75,
                diff: -25,
                details: mockDetails
              },
              {
                app: 'app diff +',
                coverage: 50,
                base: 25,
                diff: 25,
                details: mockDetails
              },
              {
                app: 'app diff null',
                coverage: undefined,
                base: null,
                diff: null,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
      })

      describe('when hiding unchanged', () => {
        beforeEach(() => {
          hideUnchanged = true
        })
        test('when result diff is 0 then no code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: 50,
                base: 50,
                diff: 0,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
        test('when result diff is negative then negative diff in code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: 50,
                base: 75,
                diff: -25,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
        test('when result diff is positive then positive diff in code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: 50,
                base: 25,
                diff: 25,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
        test('when result coverage is undefined then unknown diff in code coverage comment', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app A',
                coverage: undefined,
                base: null,
                diff: null,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
        test('when all results in one then return as expected', async () => {
          const input: BuildCommentInputs = {
            results: [
              {
                app: 'app diff 0',
                coverage: 50,
                base: 50,
                diff: 0,
                details: mockDetails
              },
              {
                app: 'app diff -',
                coverage: 50,
                base: 75,
                diff: -25,
                details: mockDetails
              },
              {
                app: 'app diff +',
                coverage: 50,
                base: 25,
                diff: 25,
                details: mockDetails
              },
              {
                app: 'app diff null',
                coverage: undefined,
                base: null,
                diff: null,
                details: mockDetails
              }
            ],
            hideCoverageReports,
            hideUnchanged
          }
          const actual = buildComment(input)
          expect(actual).toMatchSnapshot()
        })
      })
    })

    describe('when not hiding coverage reports', () => {
      beforeEach(() => {
        hideCoverageReports = false
        hideUnchanged = false
      })
      test('when all results in one then return as expected', async () => {
        const input: BuildCommentInputs = {
          results: [
            {
              app: 'app diff 0',
              coverage: 50,
              base: 50,
              diff: 0,
              details: mockDetails
            },
            {
              app: 'app diff -',
              coverage: 50,
              base: 75,
              diff: -25,
              details: mockDetails
            },
            {
              app: 'app diff +',
              coverage: 50,
              base: 25,
              diff: 25,
              details: mockDetails
            },
            {
              app: 'app diff null',
              coverage: undefined,
              base: null,
              diff: null,
              details: mockDetails
            }
          ],
          hideCoverageReports,
          hideUnchanged
        }
        const actual = buildComment(input)
        expect(actual).toMatchSnapshot()
      })
    })
  })
})
