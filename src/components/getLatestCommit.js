import 'whatwg-fetch'

const getLatestCommit = async (user, repo, branch = branch || 'master') => {
    try {
        const branchData = await fetch(`https://api.github.com/repos/${user}/${repo}/git/refs/heads/${branch}`)
        const branchJSON = await branchData.json()
        const commitData = await fetch(branchJSON.object.url)
        const commitJSON = await commitData.json()

        return commitJSON
    } catch (e) {
        return null
    }
}

export default getLatestCommit
