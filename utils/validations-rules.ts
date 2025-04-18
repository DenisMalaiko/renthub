export const ValidationsRules = {
  required: (v: string) => !!v || "Required",
  minPassword: (v: string) => v.length >= 8 || 'Use 8 characters or more for your password',
  hasUpperCase: (v: string) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
  hasNumber: (v: string) => /\d/.test(v) || "Password must contain at least one number",
  email: (v: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(v) || 'Invalid e-mail.'
  },
  match: (v1: string, v2: string | any, text: string) => v1 === v2 || `${text} do not match`,
  photoSize: (value: any) => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
  }
}
