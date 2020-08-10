import React from "react"
import algoliasearch from "algoliasearch"

const client = algoliasearch(`OFCNCOG2CU`, `ae43b69014c017e05950a1cd4273f404`)
const searchIndex = client.initIndex(`npm-search`)

interface IUseNpmPackageDataResult {
  data: Record<string, any> | null
  error: Error | null
  fetching: boolean
}

export default function useNpmPackageData(
  name: string
): IUseNpmPackageDataResult {
  const [fetching, setFetching] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)
  const [data, setData] = React.useState<{} | null>(null)

  React.useEffect(() => {
    setFetching(true)
    setError(null)
    setData(null)
    searchIndex
      .getObject(name)
      .then(object => {
        setFetching(false)
        setError(null)
        setData(object)
      })
      .catch(err => {
        setFetching(false)
        setError(err)
        setData(null)
      })
  }, [name])

  return { fetching, error, data }
}
