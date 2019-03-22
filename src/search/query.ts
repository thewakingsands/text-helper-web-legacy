import ky from 'ky'

export async function query(body: any, signal?: AbortSignal): Promise<any> {
  const resp = await ky.post(`${process.env.REACT_APP_BACKEND_URL}/_search`, {
    json: body,
    signal
  })
  const json = await resp.json()
  return json
}
