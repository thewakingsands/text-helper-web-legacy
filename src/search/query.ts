import ky from 'ky'

export async function query(body: any): Promise<any> {
  const resp = await ky.post(`${process.env.REACT_APP_BACKEND_URL}/_search`, {
    json: body
  })
  const json = await resp.json()
  return json
}
