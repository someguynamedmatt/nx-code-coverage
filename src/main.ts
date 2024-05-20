import {buildGistCoverageFileList, updateCoverageGist} from './badges'
import {buildParsedContext, upsertComment} from './github'
import {info as logInfo, warning as logWarn, setOutput} from '@actions/core'
import {JcsMergedType} from './types'
import {MainInputs} from './interfaces'
import {buildComment} from './comment'
import {existsSync} from 'fs'
import {processCoverageFiles} from './json-coverage'

export const main = async ({
  allowance = 0,
  coverageRan,
  coverageFolder,
  coverageBaseFolder,
  token,
  githubWorkspace,
  gistProcessing,
  gistToken,
  gistId,
  hideCoverageReports,
  hideUnchanged
}: MainInputs): Promise<JcsMergedType[]> => {
  try {
    // hiddenHeader to help identify any previous PR comments
    const hiddenHeaderForCoverage = '<!-- nx-code-coverage -->'
    const hiddenHeaderNoCoverage = '<!-- nx-code-coverage-none -->'
    let commentBody = ''
    let hiddenHeader = ''
    let results: JcsMergedType[] = []

    // check for coverage dir
    const coverageDirExists = existsSync(coverageFolder)

    if (coverageRan && coverageDirExists) {
      results = await processCoverageFiles({
        workspacePath: githubWorkspace,
        coverageFolder,
        coverageBaseFolder
      })

      commentBody = buildComment({results, hideCoverageReports, hideUnchanged})
      hiddenHeader = hiddenHeaderForCoverage
    } else {
      logWarn(
        `Coverage Not Ran: NOT processing coverage files ${JSON.stringify({
          coverageRan,
          coverageDirExists
        })}`
      )
      commentBody = 'No coverage ran'
      hiddenHeader = hiddenHeaderNoCoverage
    }

    const parsedContext = buildParsedContext()

    if (parsedContext.pullRequestNumber !== -1) {
      await upsertComment({
        token,
        body: commentBody,
        hiddenHeader,
        prNumber: parsedContext.pullRequestNumber,
        repoOwner: parsedContext.repoOwner,
        repoRepo: parsedContext.repoRepo
      })
    } else {
      // if not a PR, then should be push to main
      // therefore, should always have coverage

      logInfo(`No PR Detected: Updating the Coverage Gist with Code Coverage`)

      if (gistProcessing) {
        const files = buildGistCoverageFileList(results)
        if (!gistId || !gistToken) {
          throw new Error(
            'if gistProcessing not false, then gist-token and gist-id must be supplied'
          )
        }
        updateCoverageGist({files, gistToken, gistId})
      }
    }

    for (const result of results) {
      if (
        result.app === '' &&
        result?.diff !== null &&
        Math.abs(result.diff) > allowance
      ) {
        logInfo(
          'Overall diff is less than the allowable diff, setting output as true'
        )
        setOutput('decreased-coverage', true)
      }
    }
    return results
  } catch (error) {
    throw error
  }
}
