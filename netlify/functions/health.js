export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }
}
