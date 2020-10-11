export function handleErrors(res: Response) {
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res
}