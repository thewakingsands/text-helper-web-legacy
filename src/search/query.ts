import ky from 'ky'

export async function query(body: any, signal?: AbortSignal): Promise<any> {
  const resp = await ky.post(`${import.meta.env.VITE_BACKEND_URL}/_search`, {
    json: body,
    signal
  })
  const json = await resp.json()
  return json
}
