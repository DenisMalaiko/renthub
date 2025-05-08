export default function HandleServerError () {
  const getStatusCodeError = (error: any) => {
    if(!error) return 500;
    const gqlError = error[0];
    return gqlError.extensions?.code;
  }

  const getMessageCodeError = (error: any) => {
    if(!error) return 500;
    const gqlError = error[0];
    return gqlError.message;
  }

  return {
    getStatusCodeError,
    getMessageCodeError
  }
}