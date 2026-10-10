import { handleLeetCodeRequest } from '../server/leetcode.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET')
    res.end('Method not allowed')
    return
  }
  await handleLeetCodeRequest(req, res)
}
