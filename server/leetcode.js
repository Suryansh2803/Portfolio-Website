const LEETCODE_QUERY = `
  query portfolioStats($username: String!, $year: Int!, $previousYear: Int!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum { difficulty count }
      }
      userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }
      previousCalendar: userCalendar(year: $previousYear) {
        submissionCalendar
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
  }
`

export async function getLeetCodeStats(username) {
  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 PortfolioStats/1.0',
    },
    body: JSON.stringify({ query: LEETCODE_QUERY, variables: { username, year: new Date().getFullYear(), previousYear: new Date().getFullYear() - 1 } }),
  })

  if (!response.ok) throw new Error(`LeetCode returned ${response.status}`)
  const { data, errors } = await response.json()
  const profile = data?.matchedUser
  if (!profile) throw new Error(errors?.[0]?.message || 'LeetCode profile was not found')

  const solved = Object.fromEntries((profile.submitStatsGlobal?.acSubmissionNum || []).map(({ difficulty, count }) => [difficulty, count]))
  const calendar = {
    ...JSON.parse(profile.previousCalendar?.submissionCalendar || '{}'),
    ...JSON.parse(profile.userCalendar?.submissionCalendar || '{}'),
  }
  const cutoff = Math.floor((Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000)
  const recentCalendar = Object.fromEntries(Object.entries(calendar).filter(([timestamp]) => Number(timestamp) >= cutoff))

  return {
    username: profile.username,
    solved: { all: solved.All || 0, easy: solved.Easy || 0, medium: solved.Medium || 0, hard: solved.Hard || 0 },
    calendar: recentCalendar,
    streak: profile.userCalendar?.streak || 0,
    totalActiveDays: Object.values(recentCalendar).filter((count) => Number(count) > 0).length,
    contest: data.userContestRanking ? {
      rating: Math.round(data.userContestRanking.rating || 0),
      attended: data.userContestRanking.attendedContestsCount || 0,
      globalRanking: data.userContestRanking.globalRanking || 0,
      topPercentage: data.userContestRanking.topPercentage || 0,
    } : null,
    updatedAt: new Date().toISOString(),
  }
}

export async function handleLeetCodeRequest(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const username = url.searchParams.get('username') || 'suryansh_2803'
  try {
    const stats = await getLeetCodeStats(username)
    res.statusCode = 200
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(stats))
  } catch (error) {
    res.statusCode = 502
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: error.message }))
  }
}
