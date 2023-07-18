export default function (error: any) {
  console.log(error.message)
  console.log('hello')

  return {
    loadingState: false,
    error_message: error.message,
  }
}
